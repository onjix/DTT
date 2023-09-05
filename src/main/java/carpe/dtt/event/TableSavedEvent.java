package carpe.dtt.event;

import carpe.dtt.entity.Table;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess;
import org.springframework.context.ApplicationEvent;

import java.time.Clock;

public class TableSavedEvent extends ApplicationEvent {

    private final Table savedTable;

    public TableSavedEvent(Object source, Table savedTable) {
        super(source);
        this.savedTable = savedTable;
    }

    public Table getSavedTable(){
        return savedTable;
    }
}
