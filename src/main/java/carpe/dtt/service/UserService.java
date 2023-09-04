package carpe.dtt.service;

import carpe.dtt.entity.User;
import carpe.dtt.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public String saveUser(User user) {
        String id = user.getId();

        // 동일한 ID와 이름을 가진 사용자가 이미 존재하는 경우 회원 가입을 막음
        if (userRepository.existsById(id)) {
            throw new IllegalArgumentException("User with the same ID and name already exists");
        }
        // 회원 가입 로직 진행
        userRepository.save(user);
        return user.getId();
    }

    @Transactional
    public boolean login(String id, String password) {
        User user = userRepository.findById(id).orElse(new User());
        // findById로 찾은 결과가 존재하면 해당 User 객체를 사용하고, 그렇지 않으면 새로운 User 객체를 생성합니다.
        log.info("ID = {}", id);

        if (user != null && user.getPassword().equals(password)) {
            return true; // 로그인 성공
        } else {
            return false; // 로그인 실패
        }
    }
    @Transactional
    public String getUserNameByLoginId(String loginId) {
        User user = userRepository.findById(loginId).orElse(new User());;
        if (user != null) {
            return user.getName();
        } else {
            throw new IllegalArgumentException("Invalid login ID");
        }
    }
    @Transactional
     public void updateUser(User user) {
        userRepository.save(user);
    }

}
