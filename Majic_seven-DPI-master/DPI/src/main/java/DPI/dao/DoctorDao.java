package DPI.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import DPI.entity.Doctor;

@Component
@Mapper
public interface DoctorDao {
	List<Doctor> loadAllDoctor();

	Doctor loadDoctorById(int id);

	Object loadDoctorByOpenid(String doctorOpenid);
}
