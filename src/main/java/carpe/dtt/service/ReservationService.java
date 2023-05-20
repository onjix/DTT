package carpe.dtt.service;

import carpe.dtt.entity.Reservation;
import carpe.dtt.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
