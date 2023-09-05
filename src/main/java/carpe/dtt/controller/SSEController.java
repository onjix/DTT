package carpe.dtt.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@RestController
@RequestMapping("/sse")
public class SSEController {

    private final SseEmitter emitter = new SseEmitter();

    @GetMapping("/listen")
    public SseEmitter listenToDatabaseChanges() {
        // SSE 연결 요청 시, 해당 emitter를 반환
        return emitter;
    }

    // 이벤트를 보내는 메서드 (데이터베이스 변경 시 호출)
    public void sendEvent(String eventData) {
        try {
            emitter.send(SseEmitter.event().data(eventData));
        } catch (IOException e) {
            emitter.completeWithError(e);
        }
    }
}
