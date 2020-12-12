package DPI.service;

import java.util.List;

import DPI.entity.Doctor;

public interface DoctorService {
	List<Doctor> loadAllDoctor();

	Doctor loadDoctorById(int id);
}
