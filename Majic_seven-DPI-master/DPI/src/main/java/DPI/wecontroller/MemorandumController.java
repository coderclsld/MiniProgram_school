package DPI.wecontroller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DPI.entity.MemorandumInfo;
import DPI.service.MemorandumInfoService;

@RestController
public class MemorandumController {
	@Autowired
	private MemorandumInfoService memorandumInfoService;
	
	// 插入备忘录
	@RequestMapping("/insertMemorandumInfo")
	public void insertMemorandumInfo(String title, String content, HttpServletRequest request) {
		Date date = new Date();
		SimpleDateFormat matter = new SimpleDateFormat("yyyy/MM/dd");
		MemorandumInfo memorandumInfo = new MemorandumInfo();
		// 获取sessionid 以及openid
		memorandumInfo.setOpenid(request.getSession().getAttribute("openId").toString());
		memorandumInfo.setDate(matter.format(date));
		memorandumInfo.setContent(content);
		memorandumInfo.setTitle(title);
		
		memorandumInfoService.insertMemorandumInfo(memorandumInfo);;
	}
	
	// 获取当前用户的备忘录
	@RequestMapping("/loadAllMemorandumInfo")
	public List<MemorandumInfo> loadAllMemorandumInfo(HttpServletRequest request) {
		return memorandumInfoService.loadAllMemorandumInfo(request.getSession().getAttribute("openId").toString());
	}
	
	@RequestMapping("/loadMemorandumInfoById")
	public MemorandumInfo loadMemorandumInfoById(int id) {
		return memorandumInfoService.loadMemorandumInfoById(id);
	}
	@RequestMapping("/updateMemorandumInfoById")
	public void udateMemorandumInfoById(int id, String title, String content, HttpServletRequest request) {
		Date date = new Date();
		SimpleDateFormat matter = new SimpleDateFormat("yyyy/MM/dd");
		MemorandumInfo memorandumInfo = new MemorandumInfo(id, request.getSession().getAttribute("openId").toString(), title, matter.format(date), content);
		memorandumInfoService.udateMemorandumInfoById(memorandumInfo);
	}
}
