import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:8081';

  private recipesSubject = new BehaviorSubject<any>({
    currentRecipe: null,
    updatedRecipe: null,
    deletedRecipe: null,
    recipes: []
  });

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getRecipes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/api/recipe`, { headers }).pipe(
      tap((recipes) => {
        // Update recipes in the subject
        const currentState = this.recipesSubject.value;
        this.recipesSubject.next({ ...currentState, recipes });
      })
    );
  }

  createRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/api/recipe`, recipe, { headers }).pipe(
      tap((newRecipe) => {
        // Update the newRecipe in the subject
        const currentState = this.recipesSubject.value;
        this.recipesSubject.next({ ...currentState, newRecipe });
      })
    );
  }

  updateRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/api/recipe/${recipe.id}`, recipe, { headers }).pipe(
      tap((updatedRecipe) => {
        // Update the updatedRecipe in the subject
        const currentState = this.recipesSubject.value;
        const updatedRecipes = currentState.recipes.map((r: any) => (r.id === updatedRecipe.id ? updatedRecipe : r));
        this.recipesSubject.next({ ...currentState, updatedRecipe, recipes: updatedRecipes });
      })
    );
  }

  deleteRecipe(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/api/recipe/${id}`, { headers }).pipe(
      tap(() => {
        // Remove the deleted recipe from the subject
        const currentState = this.recipesSubject.value;
        const updatedRecipes = currentState.recipes.filter((recipe: any) => recipe.id !== id);
        this.recipesSubject.next({ ...currentState, deletedRecipe: id, recipes: updatedRecipes });
      })
    );
  }
}
