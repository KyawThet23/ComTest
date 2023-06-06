package com.mit.first;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class FirstAssignApplication {
	
	@Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
	
	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(FirstAssignApplication.class, args);
	}

}
