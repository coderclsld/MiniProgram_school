package DPI.entity;

public class Doctor {
	private int id;
	private String openid;
	private String docImg;
	private String introduce;
	private String name;
	private String evaluateStar;
	private String information;
	
	public Doctor() {}

	public Doctor(int id, String openid, String docImg, String introduce, String name, String evaluateStar,
			String information) {
		super();
		this.id = id;
		this.openid = openid;
		this.docImg = docImg;
		this.introduce = introduce;
		this.name = name;
		this.evaluateStar = evaluateStar;
		this.information = information;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getDocImg() {
		return docImg;
	}

	public void setDocImg(String docImg) {
		this.docImg = docImg;
	}

	public String getIntroduce() {
		return introduce;
	}

	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEvaluateStar() {
		return evaluateStar;
	}

	public void setEvaluateStar(String evaluateStar) {
		this.evaluateStar = evaluateStar;
	}

	public String getInformation() {
		return information;
	}

	public void setInformation(String information) {
		this.information = information;
	}
	
	
}
