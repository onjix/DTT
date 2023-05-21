package carpe.dtt.controller;

import carpe.dtt.entity.Table2;
import carpe.dtt.service.TableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/table2")
public class Table2Controller {
    private final TableService tableService;

    public Table2Controller(TableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Integer> getStatusById(@PathVariable Long id) {
        Integer status = tableService.getStatusById(id);
        return ResponseEntity.ok(status);
    }
    @PostMapping("/changeYY/{id}")
    public Integer changeDataUseY(@PathVariable Long id) {
        tableService.changeDataUseY(id);
        return tableService.getStatusById(id);
    }
    @PostMapping("/changeNN/{id}")
    public Integer changeDatUseN(@PathVariable Long id) {
        tableService.changeDataUseN(id);
        return tableService.getStatusById(id);
    }
}
