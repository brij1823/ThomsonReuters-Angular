import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  postUsersetting(usersetting : any) : Observable<any>{
  return this.http.post<number>('http://localhost:50106/Books/POSTADD/',usersetting);
    // return of(usersetting);
  }
}
