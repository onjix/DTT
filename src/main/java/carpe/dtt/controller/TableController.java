//package carpe.dtt.controller;
//
//import carpe.dtt.service.EventService;
//import carpe.dtt.service.TableService;
//import carpe.dtt.service.TableService2;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/table")
//public class TableController {
//    private final TableService tableService;
//    private final TableService2 tableService2;
//
//    private final EventService eventService;
//    public TableController(TableService tableService, TableService2 tableService2, EventService eventService) {
//        this.tableService = tableService;
//        this.tableService2 = tableService2;
//        this.eventService = eventService;
//    }
//
//    /**
//     *매장 1 상태 바꾸는 코드
//     */
//    @GetMapping("/1/{id}/status")
//    public ResponseEntity<Integer> getStatusById(@PathVariable Long id) {
//        Integer status = tableService.getStatusById(id);
//        return ResponseEntity.ok(status);
//    }
//    @PostMapping("/1/changeY/{id}")
//    public Integer changeDataUseY(@PathVariable Long id) {
//        tableService.changeDataUseY(id);
////        eventService.handleItemSaved(id);
//        return tableService.getStatusById(id);
////        return "redirect:/"; // 원하는 페이지로 리다이렉트
//
//    }
//
//    @PostMapping("/1/changeN/{id}")
//    public Integer changeDatUseN(@PathVariable Long id) {
//        tableService.changeDataUseN(id);
//        return tableService.getStatusById(id);
//    }
//    @PostMapping("/1/changeS/{id}")
//    public Integer changeDatUseS(@PathVariable Long id) {
//        tableService.changeDataUseS(id);
//        return tableService.getStatusById(id);
//    }
//
//    /**
//     *매장 2 상태 바꾸는 코드
//     */
//    @GetMapping("/2/{id}/status")
//    public ResponseEntity<Integer> getStatusById2(@PathVariable Long id) {
//        Integer status = tableService2.getStatusById(id);
//        return ResponseEntity.ok(status);
//    }
//    @PostMapping("/2/changeY/{id}")
//    public Integer changeDataUseY2(@PathVariable Long id) {
//        tableService2.changeDataUseY(id);
//        return tableService2.getStatusById(id);
//    }
//    @PostMapping("/2/changeN/{id}")
//    public Integer changeDatUseN2(@PathVariable Long id) {
//        tableService2.changeDataUseN(id);
//        return tableService2.getStatusById(id);
//    }
//}
