import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {
      
  }

  handleSignInGoogle(){
    console.log("google sign-in");
  }
}
