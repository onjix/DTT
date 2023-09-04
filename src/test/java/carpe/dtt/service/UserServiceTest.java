package carpe.dtt.service;

import carpe.dtt.entity.User;
import carpe.dtt.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@Transactional
class UserServiceTest {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @BeforeEach
    void setUp(){
        userService = new UserService(userRepository);
    }

//    @Test
//    void 회원가입_성공(){
//        //given
//        User user = new User();
//        user.setId("123");
//        user.setName("IM");
//
//        //when
//        String saveId = userService.saveUser(user);
//
//        //then
//        User findId = userRepository.findById(saveId).get();
//        assertThat(user.getId()).isNotEqualTo(findId.getId());
//
//    }


}