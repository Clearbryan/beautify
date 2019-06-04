import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private http: HttpClient ) {

   };

   register(url, user, headers){
     return this.http.post(url, user, headers);
   }
  
}
