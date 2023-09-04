package carpe.dtt.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity(name = "Users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @Column
    private String id;

    @Column
    private String name;

    @Column
    private String password;

    @Column
    private String phoneNumber;

    @Column
    private LocalDate birthDate;

}
