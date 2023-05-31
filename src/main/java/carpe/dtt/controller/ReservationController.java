package carpe.dtt.controller;

import carpe.dtt.entity.Reservation;
import carpe.dtt.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/api/reservations")
    public void saveReservation(@RequestBody Reservation reservation) {
        // 예약 정보를 서비스로 전달하여 저장
        System.out.println(reservation.getTime());
        reservationService.saveReservation(reservation);
    }

    @GetMapping("/api/reservations")
    public Iterable<Reservation> getAllReservations() {
        // 모든 예약 정보 조회
        return reservationService.getAllReservations();
    }
    @GetMapping("/reservations/date")
    public List<Reservation> getReservationsByDate(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return reservationService.getReservationsByDate(date);
    }
    @GetMapping("reservations/time")
    public List<Reservation> getReservationsAfterDateTime() {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        List<Reservation> reservations = reservationService.getReservationsAfterDateTime(currentDate, currentTime);
        return reservations;
    }
}
