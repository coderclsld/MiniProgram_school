package DPI.config;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Date date = new Date();
		SimpleDateFormat matter = new SimpleDateFormat("yyyy/MM/dd");
		System.out.println(matter.format(date));
		String s = "12\"\"31";
		System.out.println(s.replace("\"", ""));
	}

}
