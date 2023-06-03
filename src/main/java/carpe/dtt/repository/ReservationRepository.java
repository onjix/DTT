package carpe.dtt.repository;

import carpe.dtt.entity.Reservation;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends CrudRepository<Reservation,Long> {
    List<Reservation> findByDate(LocalDate date);
    List<Reservation> findByDateAfter(LocalDate currentDate);
    List<Reservation> findByDateBetween(LocalDate standard,LocalDate date);
    List<Reservation> findByTimeAfter(LocalTime currentTime);
    List<Reservation> findByDateAndTableN(LocalDate date, int tableN);
    List<Reservation> findByDateAndTime(LocalDate date, LocalTime time);
}
