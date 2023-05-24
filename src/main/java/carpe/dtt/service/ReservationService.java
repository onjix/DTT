package carpe.dtt.service;

import carpe.dtt.entity.Reservation;
import carpe.dtt.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    /**
     react에서 form을 이용해 예약하기를 눌러 예약 정보를 db에 저장하는 로직
     */
    public void saveReservation(Reservation reservation) {
        // 예약 정보를 저장
        reservationRepository.save(reservation);
    }
    /**
     *
     */
    public Iterable<Reservation> getAllReservations() {
        // 모든 예약 정보 조회
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByDate(LocalDate date) {
        System.out.println(date);
        List<Reservation> reservations=reservationRepository.findByDate(date);
        for (Reservation reservation : reservations) {
            System.out.println("ID: " + reservation.getId());
            System.out.println("Name: " + reservation.getName());
            System.out.println("Date: " + reservation.getDate());
            System.out.println("Time: " + reservation.getTime());
            System.out.println("Number of Guests: " + reservation.getNumOfGuests());
            System.out.println("--------------------------");
        }
        return reservationRepository.findByDate(date);
    }


}
