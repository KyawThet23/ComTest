package com.mit.first.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
	
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String resourceName;
	    private String fieldName;
	    private int fieldValue;

	    public ResourceNotFoundException(String resourceName, String fieldName, int fieldValue) {
	        super(String.format(
	                "%s not found with %s : %d",resourceName,fieldName,fieldValue
	        ));
	        this.resourceName = resourceName;
	        this.fieldName = fieldName;
	        this.fieldValue = fieldValue;
	    }

}
