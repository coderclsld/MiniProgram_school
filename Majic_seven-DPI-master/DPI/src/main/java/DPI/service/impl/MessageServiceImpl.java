package DPI.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DPI.dao.MessageDao;
import DPI.entity.Message;
import DPI.service.MessageService;
@Service(value="MessageService")
public class MessageServiceImpl implements MessageService{
	@Autowired
	private MessageDao messageDao;

	@Override
	public void insertMessage(Message message) {
		// TODO Auto-generated method stub
		messageDao.insertMessage(message);
	}

	@Override
	public List<Message> loadMessageByUser(String sender, String addressee) {
		// TODO Auto-generated method stub
		return messageDao.loadMessageByUser(sender, addressee);
	}

	@Override
	public Message loadLastMessageByUser(String sender, String addressee) {
		// TODO Auto-generated method stub
		return messageDao.loadLastMessageByUser(sender, addressee);
	}

}
