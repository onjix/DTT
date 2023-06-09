package carpe.dtt.controller;

import carpe.dtt.domain.LoginRequest;
import carpe.dtt.entity.User;
import carpe.dtt.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUpUser(@RequestBody User user) {
        try {
            // 회원 가입 서비스 호출
            userService.saveUser(user);

            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        String id = request.getId();
        String password = request.getPassword();
        // 로그인 확인
        boolean loginSuccessful = userService.login(id, password);
        if (loginSuccessful) {
            String userName = userService.getUserNameByLoginId(id);
            System.out.println(userName);
            return ResponseEntity.ok(userName);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }
    @PostMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        // 회원 가입 서비스 호출
        userService.updateUser(user);

        return ResponseEntity.ok("User registered successfully");
    }

}
