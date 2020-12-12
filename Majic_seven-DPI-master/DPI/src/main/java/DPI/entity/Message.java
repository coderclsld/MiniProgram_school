package DPI.entity;

public class Message {
	private int id;
	private String sender;
	private String addressee;
	private String content;
	private String date;
	
	public Message() {}

	public Message(int id, String sender, String addressee, String content, String date) {
		super();
		this.id = id;
		this.sender = sender;
		this.addressee = addressee;
		this.content = content;
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getAddressee() {
		return addressee;
	}

	public void setAddressee(String addressee) {
		this.addressee = addressee;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

}
