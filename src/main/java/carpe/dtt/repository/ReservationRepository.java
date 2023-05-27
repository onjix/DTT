package carpe.dtt.repository;

import carpe.dtt.entity.Reservation;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends CrudRepository<Reservation,Long> {
    List<Reservation> findByDate(LocalDate date);
//    List<Reservation> findByDateBefore(LocalDate date);
}
