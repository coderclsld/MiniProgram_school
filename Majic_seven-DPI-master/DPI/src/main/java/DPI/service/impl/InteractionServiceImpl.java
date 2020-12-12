package DPI.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DPI.dao.DoctorDao;
import DPI.dao.InteractionDao;
import DPI.dao.MessageDao;
import DPI.entity.Interaction;
import DPI.service.InteractionService;

@Service
public class InteractionServiceImpl implements InteractionService{
	
	@Autowired
	private InteractionDao interactionDao;
	
	@Autowired
	private DoctorDao doctorDao;
	
	@Autowired
	private MessageDao messageDao;

	@Override
	public void insertInteraction(Interaction interaction) {
		// TODO Auto-generated method stub
		interactionDao.insertInteraction(interaction);
	}

	@Override
	public List<Map> loadInteractionByOpenid(String openid) {
		// TODO Auto-generated method stub
		List<Map> list = new ArrayList<>();
		// 查询出来不为空时
		if (interactionDao.loadInteractionByOpenid(openid) != null) {
			// 迭代操作
			for(Interaction item: interactionDao.loadInteractionByOpenid(openid)) {
				Map<String, Object> map = new HashMap<>();
				// 加入一条咨询
				map.put("interaction", item);
				// 加入此医生
				map.put("doctor", doctorDao.loadDoctorByOpenid(item.getDoctorOpenid()));
				map.put("message", messageDao.loadLastMessageByUser(item.getUserOpenid(), item.getDoctorOpenid()));
				list.add(map);
			}
		}
		return list;
	}

}
