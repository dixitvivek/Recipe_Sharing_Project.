import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesSubject = new BehaviorSubject<any>({
    recipes: [],
    loading: false,
    newRecipe: null,
  });

  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  getRecipes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/api/recipe`, { headers }).pipe(
      tap((recipes) => {
        const currentState = this.recipesSubject.value;
        this.recipesSubject.next({ ...currentState, recipes });
      })
    );
  }

  createRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .post<any>(`${this.apiUrl}/api/recipe`, recipe, { headers })
      .pipe(
        tap((newRecipe) => {
          const currentState = this.recipesSubject.value;
          this.recipesSubject.next({
            ...currentState,
            recipes: [newRecipe, ...currentState.recipes],
          });
        })
      );
  }

  updateRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<any>(`${this.apiUrl}/api/recipe/${recipe.id}`, recipe, { headers })
      .pipe(
        tap((updatedRecipe) => {
          const currentState = this.recipesSubject.value;
          const updatedRecipes = currentState.recipes.map((item: any) =>
            item.id === updatedRecipe.id ? updatedRecipe : item
          );
          this.recipesSubject.next({
            ...currentState,
            recipes: updatedRecipes,
          });
        })
      );
  }

  likeRecipe(recipeId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<any>(`${this.apiUrl}/api/recipe/${recipeId}/like`, {}, { headers })
      .pipe(
        tap((updatedRecipe) => {
          const currentState = this.recipesSubject.value;
          const updatedRecipes = currentState.recipes.map((item: any) =>
            item.id === updatedRecipe.id ? updatedRecipe : item
          );
          this.recipesSubject.next({
            ...currentState,
            recipes: updatedRecipes,
          });
        })
      );
  }

  deleteRecipe(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/api/recipe/${id}`, {
      headers,
    }).pipe(
      tap((deletedRecipe)=>{
        const currentState=this.recipesSubject.value;
        const updatedRecipes=currentState.recipes.filter((item:any)=>item.id!==id)
        this.recipesSubject.next({...currentState,recipes:updatedRecipes})
      })
    );
  }
}
