package DPI.config;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import DPI.dao.DoctorDao;
import DPI.entity.Message;
import DPI.service.MessageService;

//@ServerEndpoint("/websocket/{user}")
@ServerEndpoint(value = "/websocket/{user}/{otherUser}")
@Component
@Service
public class MyWebSocketServer {
	

	//静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
	private static int onlineCount = 0;
	//concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。
	private static CopyOnWriteArraySet<MyWebSocketServer> webSocketSet = new CopyOnWriteArraySet<MyWebSocketServer>();

	//与某个客户端的连接会话，需要通过它来给客户端发送数据
	private Session session;
	private String user;

	/**
	 * 连接建立成功调用的方法
	 */
	@OnOpen
	public void onOpen(@PathParam(value="user") String param, Session session) {
		System.out.println("连接成功");
		this.session = session;
		this.user = param;
		webSocketSet.add(this); // 加入set中
		
		addOnlineCount(); // 在线数加1

		try {
			sendMessage("连接成功");
		} catch (IOException e) {

		}
		System.out.println("有新连接加入！ 当前在线人数" + onlineCount);
	}

	/**
	 * 连接关闭调用的方法
	 */
	@OnClose
	public void onClose() {
		webSocketSet.remove(this); // 从set中删除
		subOnlineCount(); // 在线数减1
		System.out.println("连接关闭");
		System.out.println("有连接关闭！ 当前在线人数" + onlineCount);
	}

	/**
	 * 收到客户端消息后调用的方法
	 *
	 * @param message 客户端发送过来的消息
	 */
	@OnMessage
	public void onMessage(String message, Session session, @PathParam("user") String user, @PathParam("otherUser") String otherUser) {
		System.out.println("来自" + user + "消息：" + message);
//		try {
//			session.getBasicRemote().sendText(message);
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		Date date = new Date();
		SimpleDateFormat matter = new SimpleDateFormat("yyyy/MM/dd");
		Message messages = new Message(1, user, otherUser, message.replace("\"", ""), matter.format(date).toString());
		MessageService messageService = (MessageService) SpringUtil.getBean("MessageService");
		messageService.insertMessage(messages);
		pushMessage(user, message, otherUser);
	}
	
	/**
         * 消息推送
     *
     * @param message
     * @param otherUser发送对象    otherUser为‘全部’则推送全部人员
     */
	private void pushMessage(String user, String message, String otherUser) {
		// TODO Auto-generated method stub
		if (otherUser == null || "".equals(otherUser) || otherUser.equals("全部")) {
			//群发消息
			for (MyWebSocketServer item : webSocketSet) {
				try {
					item.sendMessage(user + ":" + message);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
        } else {
        	// 每次私法信息时，将信息保存到数据库
        	
        	for (MyWebSocketServer item : webSocketSet) {
        		if (otherUser.equals(item.user)) {
        			try {
						item.sendMessage(message);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
        		}
        	}
        }
	}

	/**
	 * 
	 * @param session
	 * @param error
	 */
	@OnError
	public void onError(Session session, Throwable error) {

		error.printStackTrace();
	}
	
	public void sendMessage(String message) throws IOException {
		this.session.getBasicRemote().sendText(message);
	}

	/**
	 * 群发自定义消息
	 */
	public static void sendInfo(String message) throws IOException {

		for (MyWebSocketServer item : webSocketSet) {
			try {
				item.sendMessage(message);
			} catch (IOException e) {
				continue;
			}
		}
	}

	public static synchronized int getOnlineCount() {
		return onlineCount;
	}

	public static synchronized void addOnlineCount() {
		MyWebSocketServer.onlineCount++;
	}

	public static synchronized void subOnlineCount() {
		MyWebSocketServer.onlineCount--;
	}
}
