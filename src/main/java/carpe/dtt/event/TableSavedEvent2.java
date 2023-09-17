package carpe.dtt.event;

import carpe.dtt.entity.Table;
import carpe.dtt.entity.Table2;
import lombok.Getter;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess;
import org.springframework.context.ApplicationEvent;

import java.time.Clock;

@Getter
public class TableSavedEvent2 extends ApplicationEvent {

    private final Table2 savedTable;

    public TableSavedEvent2(Object source, Table2 savedTable) {
        super(source);
        this.savedTable = savedTable;
    }

}
