package DPI.entity;

public class Interaction {
	private int id;
	private String doctorOpenid;
	private String userOpenid;
	private boolean Answer;
	private String date;
	
	public Interaction() {}

	public Interaction(int id, String doctorOpenid, String userOpenid, boolean answer, String date) {
		super();
		this.id = id;
		this.doctorOpenid = doctorOpenid;
		this.userOpenid = userOpenid;
		Answer = answer;
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDoctorOpenid() {
		return doctorOpenid;
	}

	public void setDoctorOpenid(String doctorOpenid) {
		this.doctorOpenid = doctorOpenid;
	}

	public String getUserOpenid() {
		return userOpenid;
	}

	public void setUserOpenid(String userOpenid) {
		this.userOpenid = userOpenid;
	}

	public boolean isAnswer() {
		return Answer;
	}

	public void setAnswer(boolean answer) {
		Answer = answer;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
	
}
