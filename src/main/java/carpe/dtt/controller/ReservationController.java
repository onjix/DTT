package carpe.dtt.controller;

import carpe.dtt.entity.Reservation;
import carpe.dtt.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    /*@GetMapping("/api/reservations/check")
    public List<Reservation> checkExistingReservations(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                                       @RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
                                                       @RequestParam int tableN) {
        return reservationService.checkExistingReservations(date, time);
    }*/
    @GetMapping("/api/reservations/check")
    public List<Reservation> checkReservationAvailability(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
            @RequestParam int tableN) {

        return reservationService.checkExistingReservations(date, time, tableN);
    }

    @GetMapping("/api/reservations")
    public Iterable<Reservation> getAllReservations() {
        // 모든 예약 정보 조회
        return reservationService.getAllReservations();
    }
    @GetMapping("/reservations/date")
    public List<Reservation> getReservationsByDateAndTableNumber(
            @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
            @RequestParam("tableN") int tableN) {
        return reservationService.getReservationsByDateAndTableN(date, tableN);
    }
    @GetMapping("reservations/time")
    public List<Reservation> getReservationsAfterDateTime() {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        List<Reservation> reservations = reservationService.getReservationsAfterDateTime(currentDate, currentTime);
        return reservations;
    }

    @PutMapping("/reservations/update")
    public void updateTableStatus() {
        reservationService.updateTableStatus(); // 예약 정보 업데이트 메서드 호출

    }
    @GetMapping("/reservation/data")
    public int getBetweenData( @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                               @RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
                               int tableN) {
        LocalDate standard = LocalDate.parse("2023-05-24");
        return reservationService.getBetweenData(standard, date, time,tableN);
    }
}
