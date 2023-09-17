package carpe.dtt.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
//
//@RestController
//@RequestMapping("/sse")
//public class SSEController {
////    SseEmitter emitter = new SseEmitter();
//    private static final Long DEFAULT_TIMEOUT = 100000L;
//    private final SseEmitter emitter;
//
//    @Autowired
//    public SSEController() {
//        this.emitter = new SseEmitter(DEFAULT_TIMEOUT); // emitter 초기화
//    }
//    @GetMapping(value = "/listen")
//    public SseEmitter listen() {
//        return emitter;
//    }
//
//    public void sendEvent(Integer eventData) {
//            try {
//                emitter.send(eventData);
//            } catch (Exception e) {
//                emitter.completeWithError(e);
//            } finally {
//                emitter.complete();
//            }
//    }
//}


import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
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
    public SseEmitter getRealTimeMessageAction(HttpServletRequest request, HttpServletResponse response) throws IOException {

        final SseEmitter sseEmitter = new SseEmitter();

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

    public void sendEvent(Integer eventData)
    {
        sseEmitters.forEach(emitter -> {
            if (null != emitter)
                try {
                    System.out.println("Timeout : "+ emitter.getTimeout());
                    emitter.send(eventData);
                    emitter.complete();
                    sseEmitters.clear();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        });
    }
}
