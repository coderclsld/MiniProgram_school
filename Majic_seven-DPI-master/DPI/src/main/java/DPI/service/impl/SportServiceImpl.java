package DPI.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DPI.dao.SportDao;
import DPI.entity.Sport;
import DPI.service.SportService;

@Service
public class SportServiceImpl implements SportService {
	@Autowired
	SportDao sportDao;

	/**
	 * 通过openid和日期修改字段
	 */
	@Override
	public int updateByOpenid(Sport record) {
		// TODO Auto-generated method stub
		return sportDao.updateByOpenid(record);
	}

	/**
	 * 通过openid和日期查询今日计划
	 */
	@Override
	public Sport selectByOpenid(String openid, String exerciseDate) {
		// TODO Auto-generated method stub
		return sportDao.selectByOpenid(openid, exerciseDate);
	}

	/**
	 *增加运动记录
	 */
	@Override
	public int insertSport(Sport record) {
		// TODO Auto-generated method stub
		return sportDao.insertSport(record);
	}

}
