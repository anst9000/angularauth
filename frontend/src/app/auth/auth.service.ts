import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';

  constructor(private _http: HttpClient, private _router: Router) { }

  registerUser(user: any) {
    return this._http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this._http.post<any>(this._loginUrl, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }
}
