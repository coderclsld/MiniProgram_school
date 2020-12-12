package DPI.wecontroller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DPI.entity.Interaction;
import DPI.service.InteractionService;

@RestController
// 咨询
public class InteractionController {
	@Autowired
	private InteractionService interactionService;
	// 当用户发送一个咨询时，插入一条数据
	/**
	 * @param doctorOpenid 咨询医生的openid
	 * @param request
	 */
	@RequestMapping("/insertInteraction")
	public void insertInteraction(String doctorOpenid, HttpServletRequest request) {
		Date date = new Date();
		SimpleDateFormat matter = new SimpleDateFormat("yyyy/MM/dd");
		Interaction interaction = new Interaction(0, doctorOpenid, request.getSession().getAttribute("openId").toString(), false, matter.format(date));
		interactionService.insertInteraction(interaction);
	}
	/**
	 * 
	 * @param request
	 * @return 一个包含一个map的list  map由一个医生和一条咨询组成， 条件为当前用户发出的请求且医生同意了的咨询
	 */
	@RequestMapping("/loadInteractionByOpenid")
	public List<Map> loadInteractionByOpenid(HttpServletRequest request) {
		return interactionService.loadInteractionByOpenid(request.getSession().getAttribute("openId").toString());
	}
	
}
