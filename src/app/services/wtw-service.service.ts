import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonModel } from '../models/person.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class WtwServiceService {
  private readonly apiURL = `http://127.0.0.1:5000`;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(
    private http:HttpClient
  ) { }

  createPerson(person: PersonModel): Observable<any> {
    return this.http.post(`${this.apiURL}/new-person`,
      person, this.httpOptions
    );
  }

  createUser(user: UserModel): Observable<any> {
    return this.http.post(`${this.apiURL}/new-user`,
      user, this.httpOptions
    );
  }

  getAllPersons(): Observable<any> {
    return this.http.get(`${this.apiURL}/all-persons`);
  }
  
  userExits(username: string): Observable<any> {
    return this.http.get(`${this.apiURL}/exist-user?username=${username}`);
  }

  authenticateUser(user: UserModel): Observable<any>{
    return this.http.get(`${this.apiURL}/exist-user?username=${user.Username}&password=${user.Password}`);
  }
}
