import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export class User {
  name: string;
  dob:Date;
  gender:string;
  phoneNumber:number;
  email: string;
  password: string;
}

@Injectable()
export class CommonService {

  constructor(private httpClient: HttpClient){}

  endpoint = 'https://platformmaster.free.beeceptor.com/register';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  createUser(user: User): Observable<any> {
    return this.httpClient.post<User>(this.endpoint, JSON.stringify(user), this.httpOptions);

  }



}
