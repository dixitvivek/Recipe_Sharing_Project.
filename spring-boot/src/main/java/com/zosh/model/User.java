package com.zosh.model;


import com.fasterxml.jackson.annotation.JsonProperty;


import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@Data
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	private String email;
	
	private String fullName;

	public String getEmail() {
		// TODO Auto-generated method stub
		return email;
	}

	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	public String getFullName() {
		// TODO Auto-generated method stub
		return fullName;
	}

	public void setEmail(String email) {
		// TODO Auto-generated method stub
		this.email=email;
	}

	public void setFullName(String fullName) {
		// TODO Auto-generated method stub
		this.fullName=fullName;
	}

	public void setPassword(String encode) {
		// TODO Auto-generated method stub
		this.password=encode;
	}

	public Object getId() {
		// TODO Auto-generated method stub
		return id;
	}

	

}
