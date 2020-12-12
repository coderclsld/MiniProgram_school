package DPI.config;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/websocket")
public class WebSendController {

	@RequestMapping(value = "/sendToOne", produces = { "application/json; charset=utf-8" }, method = RequestMethod.POST)
	public void sendToOne(HttpServletRequest request, String message) {
		String str = message;
		try {
			MyWebSocketServer.sendInfo(str);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
