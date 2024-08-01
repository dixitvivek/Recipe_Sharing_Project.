import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  authSubject = new BehaviorSubject<any>({
    user:null
  })

  // login(credentials: any) {
  //   return this.http.post(`${this.baseUrl}/auth/signin`, credentials).pipe(
  //     map((response: any) => {
  //       console.log("loign - ", response);
  //       if (response.jwt) {
  //         localStorage.setItem('jwt', response.jwt);
  //       }
  //       return response;
  //     }),
  //     catchError((error) => {
  //       console.error('Error registering', error);
  //       return;
  //     }
  //   );
  // }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, userData);
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, userData);
  }

  // register(userInfo: any) {
  //   const data = this.http.post<any>(`${this.baseUrl}/auth/signup`, userInfo);

  //   return data.pipe(
  //     map((res: any) => {
  //       console.log(res);
  //       if (res.jwt) {
  //         localStorage.setItem('jwt', res.jwt);
  //       }
  //       return res;
  //     })
  //   );
  // }

  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
    // Implement logic to fetch user profile using JWT token
    return this.http.get<any>(`${this.baseUrl}/api/users/profile`, { headers }).pipe(
      tap((user)=>{
        const currentState=this.authSubject.value;
        this.authSubject.next({...currentState,user})
      })
    );
  }

  logout(){
    localStorage.clear();
    this.authSubject.next({})
  }
}
