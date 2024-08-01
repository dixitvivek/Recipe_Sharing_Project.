package com.zosh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.exception.RecipeException;
import com.zosh.exception.UserException;
import com.zosh.model.Recipe;
import com.zosh.model.User;
import com.zosh.response.ApiResponse;
import com.zosh.service.RecipeService;
import com.zosh.service.UserService;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {
	
	 @Autowired
	    private RecipeService recipeService;
	 @Autowired
	 private UserService userService;

	    @PostMapping
	    public ResponseEntity<Recipe> createRecipe(
	    		@RequestBody Recipe recipe, @RequestHeader("Authorization") String jwt) throws UserException {
	        // Assuming you have a way to fetch the user by userId from your service
	        User user = userService.findUserProfileByJwt(jwt);
	        Recipe newRecipe = recipeService.createRecipe(recipe, user);
	        return new ResponseEntity<>(newRecipe, HttpStatus.CREATED);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Recipe> getRecipeById(@PathVariable("id") Long id) throws RecipeException {
	       
	            Recipe recipe = recipeService.findRecipeById(id);
	            return new ResponseEntity<>(recipe, HttpStatus.OK);
	         
	    }
	    @GetMapping
	    public ResponseEntity<List<Recipe>> getAllRecipe() throws RecipeException {
	       
	            List<Recipe> recipe = recipeService.findAllRecipe();
	            return new ResponseEntity<>(recipe, HttpStatus.OK);
	         
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<ApiResponse> deleteRecipe(@PathVariable("id") Long id) throws RecipeException {
	        
	            recipeService.deleteRecipe(id);
	//            ApiResponse res=new ApiResponse("recipe deleted",true);
	            return new ResponseEntity<>( HttpStatus.OK);
	        
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Recipe> updateRecipe(@PathVariable("id") Long id, @RequestBody Recipe recipe) throws RecipeException {
	        
	            Recipe updatedRecipe = recipeService.updateRecipe(recipe,id);
	            return new ResponseEntity<>(updatedRecipe, HttpStatus.OK);
	        
	    }
	    
	    @PutMapping("/{id}/like")
	    public ResponseEntity<Recipe> likeRecipe(
	    		@RequestHeader("Authorization") String jwt, 
	    		@PathVariable("id") Long id 
	    		) throws RecipeException, UserException {
	    	User user = userService.findUserProfileByJwt(jwt);
	            Recipe updatedRecipe = recipeService.likeRecipe(id, user);
	            return new ResponseEntity<>(updatedRecipe, HttpStatus.OK);
	        
	    }

}
