package DPI.wecontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DPI.entity.Doctor;
import DPI.service.DoctorService;

@RestController
public class DoctorController {
	@Autowired
	private DoctorService doctorService;
	
	@RequestMapping("/loadAllDoctor")
	public List<Doctor> loadAllDoctor() {
		return doctorService.loadAllDoctor();
	}
	
	@RequestMapping("/loadDoctorById")
	public Doctor loadDoctorById(int id) {
		return doctorService.loadDoctorById(id);
	}
}
