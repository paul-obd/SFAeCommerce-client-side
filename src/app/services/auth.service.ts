import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

LoginInputClientModel: Login


  authToken: any;
  client: any;

  constructor(private http: HttpClient) { }

  login(client: Login){
    return this.http.post<{client: any, token: any}>(environment.apiUrl+ 'Authenticate/login', client)
  }

  forceLogout(client: Login){
    return this.http.post(environment.apiUrl+ 'Authenticate/force-logout', client)
  }

  logoutReq(){
    return this.http.post(environment.apiUrl+ 'Authenticate/logout', '')
  }

  
  storeAndSetAuthData(client: any, token: any){
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(client))
    this.authToken = token
    this.client = client 
  }

  loadTokenAndUser(){
    const token = localStorage.getItem('id_token')
    const client = localStorage.getItem('user')
    this.authToken = token
    this.client = JSON.parse(client!)
  }

  loggedIn(){
    const helper = new JwtHelperService();
    const token = localStorage.getItem('id_token')
    return helper.isTokenExpired(token!);
  }


  logOutClearStorage(){
    this.client = null
    this.authToken = null
    localStorage.clear()
  }


}
