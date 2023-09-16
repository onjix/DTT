//package carpe.dtt.service;
//
//import carpe.dtt.controller.SSEController;
//import carpe.dtt.entity.Table;
//import carpe.dtt.event.TableSavedEvent;
//import com.google.common.collect.Tables;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.event.EventListener;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Service;
//
//import java.awt.*;
//import java.util.concurrent.CompletableFuture;
//
//@Service
//public class EventService {
//
//    private final SSEController sseController;
//
//    @Autowired
//    public EventService(SSEController sseController) {
//        this.sseController = sseController;
//    }
//
////    @EventListener
////    public void handleItemSaved(long id) {
////        System.out.print("hi ");
////        // 데이터베이스 변경 이벤트를 비동기적으로 처리
////        CompletableFuture.runAsync(() -> {
////            // 이벤트를 보내는 코드
////            sseController.sendEvent(id);
////        });
////    }
//    @EventListener
//    public void handleItemSaved(TableSavedEvent event) {
//        Table savedItem = event.getSavedTable();
//        System.out.print("hi ");
//        System.out.println(savedItem.getStatus());
//
//        // 데이터베이스 변경 이벤트를 비동기적으로 처리
//        CompletableFuture.runAsync(() -> {
//            // 이벤트를 보내는 코드
//            sseController.sendEvent(savedItem.getStatus());
//        });
//    }
//}
