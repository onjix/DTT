package carpe.dtt.repository;

import carpe.dtt.entity.Reservation;
import carpe.dtt.entity.Reservation2;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository2 extends CrudRepository<Reservation2,Long> {
    List<Reservation2> findByDate(LocalDate date);
    List<Reservation2> findByDateAfter(LocalDate currentDate);
    List<Reservation2> findByDateBetween(LocalDate standard,LocalDate date);
    List<Reservation2> findByTimeAfter(LocalTime currentTime);
    List<Reservation2> findByDateAndTableN(LocalDate date, int tableN);
    List<Reservation2> findByDateAndTime(LocalDate date, LocalTime time);
}
