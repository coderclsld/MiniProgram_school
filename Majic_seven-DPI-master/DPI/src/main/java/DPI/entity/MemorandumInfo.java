package DPI.entity;

public class MemorandumInfo {
	private Integer id;
	private String openid;
	private String title;
	private String Date;
	private String content;
	
	public MemorandumInfo() {}

	public MemorandumInfo(Integer id, String openid, String title, String date, String content) {
		super();
		this.id = id;
		this.openid = openid;
		this.title = title;
		Date = date;
		this.content = content;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDate() {
		return Date;
	}

	public void setDate(String date) {
		Date = date;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	
}	
