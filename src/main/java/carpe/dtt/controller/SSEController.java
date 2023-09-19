package carpe.dtt.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import carpe.dtt.entity.Table;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Controller
@RequestMapping("/sse")
public class SSEController {

    private Set<SseEmitter> sseEmitters = new HashSet<SseEmitter>();

    @GetMapping("listen")
    public SseEmitter getRealTimeMessageAction1(HttpServletRequest request, HttpServletResponse response) throws IOException {

        final SseEmitter sseEmitter = new SseEmitter(0L);

        sseEmitter.onCompletion(() -> {
            synchronized (this.sseEmitters) {
                this.sseEmitters.remove(sseEmitter);
            }
        });

        sseEmitter.onTimeout(()-> {
            sseEmitter.complete();
        });

        // Put context in a map
        sseEmitters.add(sseEmitter);

        return sseEmitter;
    }

    public void sendEvent(Table eventData)
    {
        sseEmitters.forEach(emitter -> {
            if (null != emitter)
                try {
                    System.out.println("Timeout : "+ emitter.getTimeout());
                    sseEmitters.clear();
                    emitter.send(eventData);
                    System.out.println("eventData: " + eventData.getStatus());
                    emitter.complete();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        });
    }

}
