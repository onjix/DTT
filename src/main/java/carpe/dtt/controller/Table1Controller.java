package carpe.dtt.controller;

import carpe.dtt.service.TableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/table1")
public class Table1Controller {
    private final TableService tableService;

    public Table1Controller(TableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Integer> getStatusById(@PathVariable Long id) {
        Integer status = tableService.getStatusById(id);
        return ResponseEntity.ok(status);
    }
    @PostMapping("/changeY/{id}")

    public Integer changeDataUseY(@PathVariable Long id) {
        tableService.changeDataUseY(id);
        return tableService.getStatusById(id);
    }
    @PostMapping("/changeN/{id}")
    public Integer changeDatUseN(@PathVariable Long id) {
        tableService.changeDataUseN(id);
        return tableService.getStatusById(id);
    }
}
