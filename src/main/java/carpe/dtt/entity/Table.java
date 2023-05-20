package carpe.dtt.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="Table_status")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Table {
    @Id
    @Column
    private Long id;
    @Column
    private Integer status;

    public Long getId() {
        return id;
    }

    public Integer getStatus() {
        return status;
    }
}
