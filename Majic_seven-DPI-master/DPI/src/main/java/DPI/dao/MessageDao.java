package DPI.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import DPI.entity.Message;

@Mapper
@Component
public interface MessageDao {
	void insertMessage(Message message);
	
	List<Message> loadMessageByUser(@Param("sender") String sender,@Param("addressee") String addressee);
	
	Message loadLastMessageByUser(@Param("sender") String sender,@Param("addressee") String addressee);
}
