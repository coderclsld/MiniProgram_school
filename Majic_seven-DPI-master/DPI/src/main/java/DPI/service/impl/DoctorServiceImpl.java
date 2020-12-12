package DPI.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DPI.dao.DoctorDao;
import DPI.entity.Doctor;
import DPI.service.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService{
	@Autowired
	private DoctorDao doctorDao;

	@Override
	public List<Doctor> loadAllDoctor() {
		// TODO Auto-generated method stub
		return doctorDao.loadAllDoctor();
	}

	@Override
	public Doctor loadDoctorById(int id) {
		// TODO Auto-generated method stub
		return doctorDao.loadDoctorById(id);
	}
	
}
