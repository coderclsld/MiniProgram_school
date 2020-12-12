package DPI.wecontroller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DPI.entity.Sport;
import DPI.service.SportService;

@RestController
public class SportController {
	@Autowired
	SportService sportService;
	
	@PostMapping("/updateSportByOpenid")
	public int updateByOpenid(HttpServletRequest request, @RequestBody Sport record) {
		record.setOpenid(request.getSession().getAttribute("openId").toString());
		return sportService.updateByOpenid(record);
	}
	
	@RequestMapping("/selectSportByOpenid")
	public Sport selectByOpenid(HttpServletRequest request, String exerciseDate) {
		return sportService.selectByOpenid(request.getSession().getAttribute("openId").toString(), exerciseDate);
	}
	
	@RequestMapping("/insertSport")
	public int insertSport(HttpServletRequest request,@RequestBody Sport record) {
		record.setOpenid(request.getSession().getAttribute("openId").toString());
		return sportService.insertSport(record);
	}
}
