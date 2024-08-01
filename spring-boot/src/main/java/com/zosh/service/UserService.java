package com.zosh.service;

import java.util.List;
import java.util.Set;

import com.zosh.exception.UserException;
import com.zosh.model.User;

public interface UserService {

	public User findUserProfileByJwt(String jwt) throws UserException;

}
