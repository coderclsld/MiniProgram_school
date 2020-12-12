package DPI.entity;

import java.util.Date;

public class Sport {
    private Integer id;

    private String exercisePlan;

    private Integer waterNum;

    private Byte isFinish;

    private String exerciseDate;

    private Byte isRun;
    
    private String openid;
    

    public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getExercisePlan() {
        return exercisePlan;
    }

    public void setExercisePlan(String exercisePlan) {
        this.exercisePlan = exercisePlan == null ? null : exercisePlan.trim();
    }

    public Integer getWaterNum() {
        return waterNum;
    }

    public void setWaterNum(Integer waterNum) {
        this.waterNum = waterNum;
    }

    public Byte getIsFinish() {
        return isFinish;
    }

    public void setIsFinish(Byte isFinish) {
        this.isFinish = isFinish;
    }

    public String getExerciseDate() {
		return exerciseDate;
	}

	public void setExerciseDate(String exerciseDate) {
		this.exerciseDate = exerciseDate;
	}

	public Byte getIsRun() {
        return isRun;
    }

    public void setIsRun(Byte isRun) {
        this.isRun = isRun;
    }
}