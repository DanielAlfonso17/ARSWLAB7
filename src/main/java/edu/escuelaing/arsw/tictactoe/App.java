package edu.escuelaing.arsw.tictactoe;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication
public class App 
{
	public static void main(String[] args){
        SpringApplication.run(App.class, args);
        SpringApplication application = new SpringApplication(App.class);
        
        Map<String, Object> pro = new HashMap<String, Object>();
        pro.put("server port", getPort());
        application.setDefaultProperties(pro);
        application.run(args);
      
        

    }
	static int getPort() {
        if (System.getenv("PORT") != null) {
            return Integer.parseInt(System.getenv("PORT"));
        }
        return 8080; //returns default port if heroku-port isn't set (i.e. on localhost)
    }
	
}
