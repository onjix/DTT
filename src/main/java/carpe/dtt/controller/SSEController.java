package carpe.dtt.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
@RestController
@RequestMapping("/sse")
public class SSEController {
    SseEmitter emitter = new SseEmitter();

    @GetMapping(value = "/listen", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter listenToDatabaseChanges() {
        try {
            int eventData = 1;
            emitter.send(eventData);
        } catch (Exception e) {
            emitter.completeWithError(e);
        } finally {
            emitter.complete();
        }
        return emitter;
    }
}
