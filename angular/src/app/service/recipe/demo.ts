import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:8081';
//   private recipesSubject = new BehaviorSubject<any[]>([]);

private recipesSubject = new BehaviorSubject<any>({currentRecipe:null,updatedRecipe:null,deletedRecipe:null,recipes:[]});

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getRecipes(): Observable<any[]> {
    const headers = this.getHeaders();
    this.http.get<any[]>(`${this.apiUrl}/api/recipe`, { headers }).subscribe(
      (recipes) => {
        this.recipesSubject.next(recipes);
      },
      (error) => {
        // Handle error
        console.error('Error fetching recipes', error);
      }
    );
    return this.recipesSubject.asObservable();
  }

  createRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/api/recipe`, recipe, { headers }).pipe(
      tap((newRecipe) => {
        // Update the state after creating a new recipe
        const currentRecipes = this.recipesSubject.value;
        this.recipesSubject.next([...currentRecipes, newRecipe]);
      })
    );
  }

  updateRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/api/recipe/${recipe.id}`, recipe, { headers }).pipe(
      tap((updatedRecipe) => {
        // Update the state after updating a recipe
        const currentRecipes = this.recipesSubject.value;
        const index = currentRecipes.findIndex((r) => r.id === updatedRecipe.id);
        currentRecipes[index] = updatedRecipe;
        this.recipesSubject.next([...currentRecipes]);
      })
    );
  }

  deleteRecipe(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/api/recipe/${id}`, { headers }).pipe(
      tap(() => {
        // Update the state after deleting a recipe
        const currentRecipes = this.recipesSubject.value;
        const updatedRecipes = currentRecipes.filter((recipe) => recipe.id !== id);
        this.recipesSubject.next(updatedRecipes);
      })
    );
  }
}
