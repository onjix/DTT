package carpe.dtt.controller;

import carpe.dtt.entity.Reservation;
import carpe.dtt.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
        reservationService.saveReservation(reservation);
    }

    @GetMapping("/api/reservations")
    public Iterable<Reservation> getAllReservations() {
        // 모든 예약 정보 조회
        return reservationService.getAllReservations();
    }
}
