package DPI.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import DPI.entity.Interaction;

@Component
@Mapper
public interface InteractionDao {

	void insertInteraction(Interaction interaction);

	List<Interaction> loadInteractionByOpenid(String openid);
	
}
