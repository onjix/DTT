package carpe.dtt.controller;

import carpe.dtt.entity.Reservation;
import carpe.dtt.entity.Reservation2;
import carpe.dtt.service.ReservationService;
import carpe.dtt.service.ReservationService2;
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
    private final ReservationService2 reservationService2;

    @Autowired
    public ReservationController(ReservationService reservationService, ReservationService2 reservationService2) {
        this.reservationService = reservationService;
        this.reservationService2 = reservationService2;
    }

    /**
     *매장 1 예약 정보에 관한 코드
     */
    @PostMapping("/api/reservations")
    public void saveReservation1(@RequestBody Reservation reservation) {
        // 예약 정보를 서비스로 전달하여 저장
        System.out.println(reservation.getTime());
        reservationService.saveReservation1(reservation);
    }
    @GetMapping("/api/reservations/check")
    public List<Reservation> checkReservationAvailability1(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
            @RequestParam int tableN) {

        return reservationService.checkExistingReservations1(date, time, tableN);
    }

    @GetMapping("/api/reservations")
    public Iterable<Reservation> getAllReservations1() {
        // 모든 예약 정보 조회
        return reservationService.getAllReservations1();
    }
    @GetMapping("/reservations/date")
    public List<Reservation> getReservationsByDateAndTableNumber1(
            @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
            @RequestParam("tableN") int tableN) {
        return reservationService.getReservationsByDateAndTableN1(date, tableN);
    }
    @GetMapping("reservations/time")
    public List<Reservation> getReservationsAfterDateTime1() {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();

        return reservationService.getReservationsAfterDateTime1(currentDate,currentTime);
    }

    @PutMapping("/reservations/update")
    public void updateTableStatus1() {
        reservationService.updateTableStatus1(); // 예약 정보 업데이트 메서드 호출

    }
    @GetMapping("/reservation/data")
    public int getBetweenData1( @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                               @RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
                               int tableN) {
        LocalDate standard = LocalDate.parse("2023-05-24");
        return reservationService.getBetweenData1(standard, date, time,tableN);
    }
    @GetMapping("/reservation/future")
    public List<Reservation> getFutureData(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                           @RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time) {
        System.out.println(reservationService.checkFutureReservation1(date,time));
        return reservationService.checkFutureReservation1(date, time);
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    @GetMapping("/reservations/pos")
    public List<Reservation> sendPosData() {
        LocalDate currentDate = LocalDate.now();
        System.out.println(reservationService.getReservationsByDate1(currentDate));
        return reservationService.getReservationsByDate1(currentDate);
    }


    //INSERT INTO reservation (date, name, num_of_guests, tableN, time)
    //VALUES ('2023-05-25', '윤형준', 2, 2, '15:00:00');

    /**
     * 매장 2에 관한 코드
     */
    @PostMapping("/2/api/reservations")
    public void saveReservation2(@RequestBody Reservation2 reservation2) {
        // 예약 정보를 서비스로 전달하여 저장
        System.out.println(reservation2.getTime());
        reservationService2.saveReservation(reservation2);
    }
    @GetMapping("/2/api/reservations/check")
    public List<Reservation2> checkReservationAvailability2(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
            @RequestParam int tableN) {

        return reservationService2.checkExistingReservations(date, time, tableN);
    }

    @GetMapping("/2/api/reservations")
    public Iterable<Reservation2> getAllReservations2() {
        // 모든 예약 정보 조회
        return reservationService2.getAllReservations();
    }
    @GetMapping("/2/reservations/date")
    public List<Reservation2> getReservationsByDateAndTableNumber2(
            @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
            @RequestParam("tableN") int tableN) {
        return reservationService2.getReservationsByDateAndTableN(date, tableN);
    }
    @GetMapping("/2/reservations/time")
    public List<Reservation2> getReservationsAfterDateTime2() {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        List<Reservation2> reservations = reservationService2.getReservationsAfterDateTime2(currentDate, currentTime);
        return reservations;
    }

    @PutMapping("/2/reservations/update")
    public void updateTableStatus2() {
        reservationService2.updateTableStatus(); // 예약 정보 업데이트 메서드 호출

    }
    @GetMapping("/2/reservation/data")
    public int getBetweenData2( @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                               @RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
                               int tableN) {
        LocalDate standard = LocalDate.parse("2023-05-24");
        return reservationService2.getBetweenData(standard, date, time,tableN);
    }

}
