package carpe.dtt.controller;

import carpe.dtt.service.TableService;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/table")
public class TableController {
    private final TableService tableService;

    public TableController(TableService tableService) {
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
