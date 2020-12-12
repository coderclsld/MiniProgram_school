package DPI.service;

import java.util.List;
import java.util.Map;

import DPI.entity.Interaction;

public interface InteractionService {

	void insertInteraction(Interaction interaction);

	List<Map> loadInteractionByOpenid(String openid);
	
}
