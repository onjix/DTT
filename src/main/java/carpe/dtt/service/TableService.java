package carpe.dtt.service;

import carpe.dtt.entity.Reservation;
import carpe.dtt.entity.Table;
import carpe.dtt.event.EntityChangeEvent;
import carpe.dtt.event.TableSavedEvent;
import carpe.dtt.repository.TableRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class TableService {
    private final TableRepository tableRepository;
    private ApplicationEventPublisher eventPublisher;


    public TableService(TableRepository tableRepository , ApplicationEventPublisher eventPublisher) {
        this.tableRepository = tableRepository;
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
            log.info("Table Status = {}",table.getStatus());
            return table.getStatus();
        } else {
            throw new RuntimeException("Table not found with id " + id);
        }
    }
    @Transactional
    public Table changeDataUseY(Long id) {
        Table table= tableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid data Id:" + id));
        // 데이터 수정 작업 수행
        table.setStatus(1);

        Table savetable = tableRepository.save(table);
        eventPublisher.publishEvent(new TableSavedEvent(this, savetable));
        return savetable;

    }
    @Transactional
    public Table changeDataUseN(Long id) {
        Table table= tableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid data Id:" + id));
        // 데이터 수정 작업 수행
        table.setStatus(0);
        Table savetable = tableRepository.save(table);
        eventPublisher.publishEvent(new TableSavedEvent(this, savetable));
        return savetable;
    }

    @Transactional
    public void changeDataUseS(Long id) {
        Table table= tableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid data Id:" + id));
        // 데이터 수정 작업 수행
        table.setStatus(2);
        tableRepository.save(table);
    }

    public void updateTableReservationStatus(Long tableId) {
        Optional<Table> optionalTable = tableRepository.findById(tableId);
        if (optionalTable.isPresent()) {
            Table table = optionalTable.get();
            table.setStatus(3);
            tableRepository.save(table);
        } else {
            // 테이블이 존재하지 않는 경우에 대한 예외 처리
        }
    }

    public Integer getCurrentStatus(Long tableId) {
        Optional<Table> optionalTable = tableRepository.findById(tableId);
        return optionalTable.map(Table::getStatus).orElse(null);
    }

    public void updateTableStatus(Long tableId, Integer newStatus) {
        Optional<Table> optionalTable = tableRepository.findById(tableId);
        optionalTable.ifPresent(table -> {
            table.setStatus(newStatus);
            tableRepository.save(table);
        });
    }

}
