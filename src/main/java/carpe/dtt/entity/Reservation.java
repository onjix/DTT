package carpe.dtt.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity(name="Reservation")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private LocalDate date;
    @Column
    private LocalTime time;
    @Column
    private int numOfGuests;
    @Column
    private int tableN;

}
