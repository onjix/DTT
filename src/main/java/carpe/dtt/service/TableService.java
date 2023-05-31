package carpe.dtt.service;

import carpe.dtt.entity.Reservation;
import carpe.dtt.entity.Table;
import carpe.dtt.event.EntityChangeEvent;
import carpe.dtt.listener.DatabaseChangeListener;
import carpe.dtt.repository.TableRepository;
import jakarta.transaction.Transactional;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TableService {
    private final TableRepository tableRepository;
    private final DatabaseChangeListener databaseChangeListener;
    private ApplicationEventPublisher eventPublisher;


    public TableService(TableRepository tableRepository, DatabaseChangeListener databaseChangeListener, ApplicationEventPublisher eventPublisher) {
        this.tableRepository = tableRepository;
        this.databaseChangeListener = databaseChangeListener;
        this.eventPublisher = eventPublisher;
    }


    // 엔티티 변경 시 리스너 호출하는 메소드

    @Transactional
    public Integer getStatusById(Long id) {
        Optional<Table> optionalTable = tableRepository.findById(id);
        if (optionalTable.isPresent()) {
            Table table = optionalTable.get();
            // 엔티티 변경 이벤트 발행
            eventPublisher.publishEvent(new EntityChangeEvent(this, id));
            System.out.println(table.getStatus());
            return table.getStatus();
        } else {
            throw new RuntimeException("Table not found with id " + id);
        }
    }
    @Transactional
    public void changeDataUseY(Long id) {
        Table table= tableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid data Id:" + id));
        // 데이터 수정 작업 수행
        table.setStatus(1);
        tableRepository.save(table);
    }
    @Transactional
    public void changeDataUseN(Long id) {
        Table table= tableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid data Id:" + id));
        // 데이터 수정 작업 수행
        table.setStatus(0);
        tableRepository.save(table);
    }

}
