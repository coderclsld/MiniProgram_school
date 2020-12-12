package DPI.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import DPI.entity.Message;

public interface MessageService {
	void insertMessage(Message message);
	/**
	 * 
	 * @param sender 发送人
	 * @param addressee 收信人
	 * @return
	 */
	List<Message> loadMessageByUser(String sender, String addressee);
	
	Message loadLastMessageByUser(@Param("sender") String sender,@Param("addressee") String addressee);
}
