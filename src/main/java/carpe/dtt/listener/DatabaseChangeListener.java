package carpe.dtt.listener;

import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import org.springframework.stereotype.Component;


@Component
public class DatabaseChangeListener {

    @PostPersist
    public void onPostPersist(Object entity) {
        // 삽입 이벤트 처리 로직
        System.out.println("Entity inserted: " + entity);
    }

    @PostUpdate
    public void onPostUpdate(Object entity) {
        // 업데이트 이벤트 처리 로직
        System.out.println("Entity updated: " + entity);
    }

    @PostRemove
    public void onPostRemove(Object entity) {
        // 삭제 이벤트 처리 로직
        System.out.println("Entity removed: " + entity);
    }
}
