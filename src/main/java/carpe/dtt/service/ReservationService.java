package carpe.dtt.service;

import carpe.dtt.entity.Reservation;
import carpe.dtt.repository.ReservationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final TableService tableService;


    @Autowired
    public ReservationService(ReservationRepository reservationRepository, TableService tableService) {
        this.reservationRepository = reservationRepository;
        this.tableService = tableService;
    }

    /**
     * react에서 form을 이용해 예약하기를 눌러 예약 정보를 db에 저장하는 로직
     */
    public void saveReservation1(Reservation reservation) {
        // 예약 정보를 저장
        reservationRepository.save(reservation);
    }

    public Iterable<Reservation> getAllReservations1() {
        // 모든 예약 정보 조회
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByDate1(LocalDate date) {
        log.info("Current Date={}", date);
        List<Reservation> reservations = reservationRepository.findByDate(date);
        for (Reservation reservation : reservations) {
            log.info("ID: {}", reservation.getId());
            log.info("Name: {}", reservation.getName());
            log.info("Date: {}", reservation.getDate());
            log.info("Time: {}", reservation.getTime());
            log.info("Number of Guests: {}", reservation.getNumOfGuests());
            log.info("--------------------------");
        }
        return reservationRepository.findByDate(date);
    }

    /**
     * 현재 날짜와 시간 이후의 예약 정보를 가져오는 로직
     */
    public List<Reservation> getReservationsAfterDateTime(LocalDate currentDate, LocalTime currentTime) {
        List<Reservation> reservationsAfterDateTime = new ArrayList<>();
        List<Reservation> reservationDate=reservationRepository.findByDate(currentDate);
        log.info("Reservation Date = {}", reservationDate);
        List<Reservation> reservationsAfterDate = reservationRepository.findByDateAfter(currentDate);
        log.info("Reservation After Date = {}", reservationsAfterDate);
        for (Reservation reservation : reservationDate) {
            // 예약 시간의 날짜와 시간을 함께 비교하여 현재 시간 이후의 예약을 찾음
            LocalDateTime reservationDateTime = LocalDateTime.of(reservation.getDate(), reservation.getTime());
            LocalDateTime currentDateTime = LocalDateTime.of(currentDate, currentTime);
            if (reservationDateTime.isAfter(currentDateTime) || reservationDateTime.isEqual(currentDateTime)) {
                reservationsAfterDateTime.add(reservation);
                log.info("Reservation ={}",reservation);
            }
        }
        for (Reservation reservation : reservationsAfterDate) {
            // 예약 시간의 날짜와 시간을 함께 비교하여 현재 시간 이후의 예약을 찾음
            LocalDateTime reservationDateTime = LocalDateTime.of(reservation.getDate(), reservation.getTime());
            LocalDateTime currentDateTime = LocalDateTime.of(currentDate, currentTime);
            if (reservationDateTime.isAfter(currentDateTime) || reservationDateTime.isEqual(currentDateTime)) {
                reservationsAfterDateTime.add(reservation);
                log.info("Reservation ={}",reservation);
            }
        }
        return reservationsAfterDateTime;
    }

    /**
     * 현재 날짜와 table 넘버를 비교하여 table 넘버가 맞는 예약 정보만 가져오는 로직
     */

    public List<Reservation> getReservationsByDateAndTableN1(LocalDate date, int tableN) {
        return reservationRepository.findByDateAndTableN(date, tableN);
    }

    /**
     * 현재 날짜와 시간을 비교하고 예약된 데이터의 30분 전에 테이블의 상태를 바꾸고 예약 시간이 되면 사용중으로 바꾸는 로직
     */
    public void updateTableStatus1() {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();

        List<Reservation> reservations = reservationRepository.findByDate(currentDate);
        for (Reservation reservation : reservations) {
            LocalTime reservationTime = reservation.getTime();
            Long id = (long)reservation.getTableN();


            // 예약 시간에서 30분을 뺀 시간 계산
            LocalTime thirtyMinutesBeforeReservationTime = reservationTime.minusMinutes(30);
            log.info("예약 시간에서 30분 뺀 시간={}", thirtyMinutesBeforeReservationTime);

            // 현재 시간과 비교하여 30분 전인 경우에만 처리
            if (currentTime.isAfter(thirtyMinutesBeforeReservationTime) && currentTime.isBefore(reservationTime)) {
                tableService.updateTableReservationStatus(id);
            }else{
                tableService.changeDataUseY(id);
            }
        }
    //Update table_status set status = 1 where id= 1
    }

    /**
     * 현재 날짜와 시간을 비교하고 DB에 저장된 tableN까지 비교하여 맞는 예약 정보만 가져오는 로직
     */
    public List<Reservation> checkExistingReservations1(LocalDate date, LocalTime time, int tableN) {
        List<Reservation> reservations = reservationRepository.findByDateAndTime(date, time);
        List<Reservation> filteredReservations = new ArrayList<>();
        for (Reservation reservation : reservations) {
            if (reservation.getTableN() == tableN) {
                filteredReservations.add(reservation);
            }
        }
        return filteredReservations;
    }

    /**
     * 날짜와 시간을 입력하고 입력한 날짜의 예약 률을 예측하는 로직
     */
    public int getBetweenData1(LocalDate standard, LocalDate date,LocalTime time,int tableN) {
        List<Reservation> reservations = reservationRepository.findByDateBetween(standard, date);
       long diffDays = ChronoUnit.DAYS.between(standard, date);
        int n = (int) (diffDays / 7);
        int count = 0;
        for (int i = 1; i <= n; i++) {
            LocalDate oneWeekAgo = date.minusWeeks(i);
            System.out.println(i + " 주 전 날짜: " + oneWeekAgo);

            for (Reservation reservation : reservations) {
                if (reservation.getDate().isEqual(oneWeekAgo)
                        && reservation.getTime().equals(time)&&
                        reservation.getTableN()==(tableN)) {
                    count++;
                    System.out.println(count);
                    log.info("같은 날짜에 있는 데이터={}", reservation);
                }
            }
        }
        double predictNum = (double) count / n;
        double percentage = ((double) count / n) * 100.0;
        int result = (int) percentage;
        log.info("예상 숫자 = {}", predictNum);
        log.info("결과 ={}", result);
        return result;
    }
    /**
     * 현재 날짜와 시간을 비교하고 DB에 저장된 값을 비교하여 맞는 예약 정보만 가져오는 로직
     */
    public List<Reservation> checkFutureReservation1(LocalDate date, LocalTime time) {
      return reservationRepository.findByDateAndTime(date, time);
    }
}
