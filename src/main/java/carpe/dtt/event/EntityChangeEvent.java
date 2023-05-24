package carpe.dtt.event;

import org.springframework.context.ApplicationEvent;

public class EntityChangeEvent extends ApplicationEvent {
    private Long entityId;

    public EntityChangeEvent(Object source, Long entityId) {
        super(source);
        this.entityId = entityId;
    }

    public Long getEntityId() {
        return entityId;
    }
}

