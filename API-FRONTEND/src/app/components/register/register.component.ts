import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  username: String;
  password: String;
  passwordConfirmation: String;

  constructor( private registerService: RegisterService ) { 

  }

  ngOnInit() {
  }

  onRegisterSubmit(registerForm){
    const headers = new HttpHeaders({ 'Content-type': 'application/json', 'token': 'my token' })
    this.registerService.register('http://localhost:5007/users/register', {
        'name': this.name,
        'email': this.email,
        'username': this.username,
        'password': this.password,
        'passwordConfirmation': this.passwordConfirmation
    }, {headers: headers}).subscribe((response) =>{
      console.log(response)
    })
  }

} 
