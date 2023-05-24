package carpe.dtt.listener;

import carpe.dtt.event.EntityChangeEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class EntityChangeListener {

    @TransactionalEventListener
    public void onEntityChange(EntityChangeEvent event) {
        // 변경 이벤트 처리 로직 작성
        Long entityId = event.getEntityId();
        // 상태 변경 메소드 호출 등 필요한 동작 수행
    }
}
