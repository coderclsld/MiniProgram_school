package DPI.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import DPI.entity.Sport;

@Component
@Mapper
public interface SportDao {
    int deleteByPrimaryKey(Integer id);

    int insertSport(Sport record);

    int insertSelective(Sport record);

    Sport selectByOpenid(@Param("openid")String openid,@Param("exerciseDate") String exerciseDate);

    int updateByOpenid(Sport record);

    int updateByPrimaryKey(Sport record);
}