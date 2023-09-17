package carpe.dtt.service;

import carpe.dtt.entity.Table;
import carpe.dtt.entity.Table2;
import carpe.dtt.event.EntityChangeEvent;
import carpe.dtt.event.TableSavedEvent;
import carpe.dtt.event.TableSavedEvent2;
import carpe.dtt.repository.TableRepository2;
import jakarta.transaction.Transactional;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TableService2 {
    private final TableRepository2 tableRepository2;
    private ApplicationEventPublisher eventPublisher;


    public TableService2(TableRepository2 tableRepository2, ApplicationEventPublisher eventPublisher) {
        this.tableRepository2 = tableRepository2;
        this.eventPublisher = eventPublisher;
    }


    // 엔티티 변경 시 리스너 호출하는 메소드

    @Transactional
    public Integer getStatusById(Long id) {
        Optional<Table2> optionalTable = tableRepository2.findById(id);
        if (optionalTable.isPresent()) {
            Table2 table2 = optionalTable.get();
            // 엔티티 변경 이벤트 발행
            eventPublisher.publishEvent(new EntityChangeEvent(this, id));
            System.out.println(table2.getStatus());
            return table2.getStatus();
        } else {
            throw new RuntimeException("Table not found with id " + id);
        }
    }
    @Transactional
    public Table2 changeDataUseY(Long id) {
        Table2 table2= tableRepository2.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid data Id:" + id));
        // 데이터 수정 작업 수행
        table2.setStatus(1);
        Table2 savetable = tableRepository2.save(table2);
        eventPublisher.publishEvent(new TableSavedEvent2(this, savetable));
        return savetable;
    }
    @Transactional
    public Table2 changeDataUseN(Long id) {
        Table2 table2= tableRepository2.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid data Id:" + id));
        // 데이터 수정 작업 수행
        table2.setStatus(0);
        Table2 savetable = tableRepository2.save(table2);
        eventPublisher.publishEvent(new TableSavedEvent2(this, savetable));
        return savetable;
    }

    public void updateTableStatus(Long tableId) {
        Optional<Table2> optionalTable = tableRepository2.findById(tableId);
        if (optionalTable.isPresent()) {
            Table2 table2 = optionalTable.get();
            table2.setStatus(3);
            tableRepository2.save(table2);
        } else {
            // 테이블이 존재하지 않는 경우에 대한 예외 처리
        }
    }

}
