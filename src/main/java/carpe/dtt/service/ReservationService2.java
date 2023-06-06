package carpe.dtt.service;

import carpe.dtt.entity.Reservation;
import carpe.dtt.entity.Reservation2;
import carpe.dtt.repository.ReservationRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService2 {

    private final ReservationRepository2 reservationRepository2;
    private final TableService2 tableService2;


    @Autowired
    public ReservationService2(ReservationRepository2 reservationRepository2, TableService2 tableService2) {
        this.reservationRepository2 = reservationRepository2;
        this.tableService2 = tableService2;
    }

    /**
     * react에서 form을 이용해 예약하기를 눌러 예약 정보를 db에 저장하는 로직
     */
    public void saveReservation(Reservation2 reservation2) {
        // 예약 정보를 저장
        reservationRepository2.save(reservation2);
    }

    public Iterable<Reservation2> getAllReservations() {
        // 모든 예약 정보 조회
        return reservationRepository2.findAll();
    }

    public List<Reservation2> getReservationsByDate(LocalDate date) {
        System.out.println(date);
        List<Reservation2> reservations = reservationRepository2.findByDate(date);
        for (Reservation2 reservation : reservations) {
            System.out.println("ID: " + reservation.getId());
            System.out.println("Name: " + reservation.getName());
            System.out.println("Date: " + reservation.getDate());
            System.out.println("Time: " + reservation.getTime());
            System.out.println("Number of Guests: " + reservation.getNumOfGuests());
            System.out.println("--------------------------");
        }
        return reservationRepository2.findByDate(date);
    }

    /**
     * 현재 날짜와 시간 이후의 예약 정보를 가져오는 로직
     */
    public List<Reservation2> getReservationsAfterDateTime2(LocalDate currentDate, LocalTime currentTime) {
        List<Reservation2> reservationsAfterTime = new ArrayList<>();

        // currentDate와 같은 날짜인 예약 중 currentTime 이후의 시간을 찾아서 reservationsAfterTime에 추가
        List<Reservation2> reservationsAfterDate = reservationRepository2.findByDateAfter(currentDate);
        for (Reservation2 reservation : reservationsAfterDate) {
            // 예약 시간의 날짜와 시간을 함께 비교하여 현재 시간 이후의 예약을 찾음
            LocalDateTime reservationDateTime = LocalDateTime.of(reservation.getDate(), reservation.getTime());
            LocalDateTime currentDateTime = LocalDateTime.of(currentDate, currentTime);
            if (reservationDateTime.isAfter(currentDateTime)) {
                reservationsAfterTime.add(reservation);
            }
        }

        System.out.println(reservationsAfterTime);

        return reservationsAfterTime;
    }

    /**
     * 현재 날짜와 table 넘버를 비교하여 table 넘버가 맞는 예약 정보만 가져오는 로직
     */

    public List<Reservation2> getReservationsByDateAndTableN(LocalDate date, int tableN) {
        return reservationRepository2.findByDateAndTableN(date, tableN);
    }

    /**
     * 현재 날짜와 시간을 비교하고 예약된 데이터의 30분 전에 테이블의 상태를 바꾸는 로직
     */
    public void updateTableStatus() {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();

        List<Reservation2> reservations = reservationRepository2.findByDate(currentDate);
        for (Reservation2 reservation : reservations) {
            LocalTime reservationTime = reservation.getTime();

            // 예약 시간에서 30분을 뺀 시간 계산
            LocalTime thirtyMinutesBeforeReservationTime = reservationTime.minusMinutes(30);

            // 현재 시간과 비교하여 30분 전인 경우에만 처리
            if (currentTime.isAfter(thirtyMinutesBeforeReservationTime)) {
                tableService2.updateTableStatus((long) reservation.getTableN()); // 예약 객체를 전달
            }
        }
    }

    /**
     * 현재 날짜와 시간을 비교하고 DB에 저장된 tableN까지 비교하여 맞는 예약 정보만 가져오는 로직
     */
    public List<Reservation2> checkExistingReservations(LocalDate date, LocalTime time, int tableN) {
        List<Reservation2> reservations = reservationRepository2.findByDateAndTime(date, time);
        List<Reservation2> filteredReservations = new ArrayList<>();
        for (Reservation2 reservation : reservations) {
            if (reservation.getTableN() == tableN) {
                filteredReservations.add(reservation);
            }
        }
        return filteredReservations;
    }

    /**
     * 날짜와 시간을 입력하고 입력한 날짜의 예약 률을 예측하는 로직
     */
    public int getBetweenData(LocalDate standard, LocalDate date,LocalTime time,int tableN) {
        List<Reservation2> reservations = reservationRepository2.findByDateBetween(standard, date);
        System.out.println(date);
        System.out.println(time);
        long diffDays = ChronoUnit.DAYS.between(standard, date);

        System.out.println(diffDays);
        int n = (int) (diffDays / 7);
        System.out.println(n);
        int count = 0;

        for (int i = 1; i <= n; i++) {
            LocalDate oneWeekAgo = date.minusWeeks(i);
            System.out.println(i + " 주 전 날짜: " + oneWeekAgo);

            for (Reservation2 reservation : reservations) {
                if (reservation.getDate().isEqual(oneWeekAgo)
                        && reservation.getTime().equals(time)&&
                        reservation.getTableN()==(tableN)) {
                    count++;
                    System.out.println(count);
                    System.out.println("같은 날짜에 있는 데이터: " + reservation);
                }
            }
        }
        System.out.println(count);
        System.out.println(n);
        double predictNum = (double) count / n;
        double percentage = ((double) count / n) * 100.0;
        int result = (int) percentage;
        System.out.println(predictNum);
        System.out.println(result);
        return result;

    }
}
