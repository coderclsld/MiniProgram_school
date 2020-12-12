package DPI.service;

import DPI.entity.Sport;

public interface SportService {
	int updateByOpenid(Sport record);
	Sport selectByOpenid(String openid,String exerciseDate);
	int insertSport(Sport record);
}
