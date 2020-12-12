package DPI.wecontroller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DPI.entity.Message;
import DPI.service.MessageService;

@RestController
public class MessageController {
	@Autowired
	private MessageService messageService;
	
	@RequestMapping("/loadMessageByUser")
	public List<Message> loadMessageByUser(String addressee, HttpServletRequest request) {
		return messageService.loadMessageByUser(request.getSession().getAttribute("openId").toString(), addressee);
	}
}
