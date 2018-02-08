import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor( private authService : AuthService ) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null,[Validators.required])
    });
  }


onSubmit(){
  const email = this.signUpForm.value['email'];
  const password = this.signUpForm.value['password'];

  this.authService.signUpUser(email,password);
  
}

}
