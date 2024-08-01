package com.zosh.request;

import lombok.Data;

@Data
public class LoginRequest {
	private String email;
	private String password;
	public String getEmail() {
		// TODO Auto-generated method stub
		return email;
	}
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	} 

}
