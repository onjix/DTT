package carpe.dtt.controller;

import carpe.dtt.entity.User;
import carpe.dtt.service.UserService;
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
        // 회원 가입 서비스 호출
        userService.saveUser(user);

        return ResponseEntity.ok("User registered successfully");
    }

   /* @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        // ID를 사용하여 사용자 정보 조회
        User user = userService.existsByUsername(id);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }*/

    // 기타 사용자 관련 API (수정, 삭제 등) 추가 가능

}
