import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;

  constructor( private authService : AuthService ) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null,[Validators.required])
    });
  }


onSubmit(){
  const email = this.signInForm.value['email'];
  const password = this.signInForm.value['password'];

  this.authService.signInUser(email, password);
  
}

}
