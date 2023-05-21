package carpe.dtt.service;

import carpe.dtt.entity.Table1;
import carpe.dtt.repository.TableRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TableService {
    private final TableRepository tableRepository;

    public TableService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }
    @Transactional
    public Integer getStatusById(Long id) {
        Optional<Table1> optionalTable = tableRepository.findById(id);
        if (optionalTable.isPresent()) {
            Table1 table = optionalTable.get();
            return table.getStatus();
        } else {
            throw new RuntimeException("Table not found with id " + id);
        }
    }

    @Transactional
    public void changeDataUseY(Long id) {
        Table1 table= tableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid data Id:" + id));
        // 데이터 수정 작업 수행
        table.setStatus(1);
        tableRepository.save(table);
    }
    @Transactional
    public void changeDataUseN(Long id) {
        Table1 table= tableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid data Id:" + id));
        // 데이터 수정 작업 수행
        table.setStatus(0);
        tableRepository.save(table);
    }
}
