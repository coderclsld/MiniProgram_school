package DPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.RestController;

import DPI.config.SpringUtil;

@EnableConfigurationProperties
@EnableAutoConfiguration
@SpringBootApplication
@ServletComponentScan
@RestController
@Import(value={SpringUtil.class})
class Application {
	@Bean
    public SpringUtil springUtil2(){
		return new SpringUtil();
    }

    public static void main(String[] args) {  
        SpringApplication.run(Application.class, args);  
    }

}
