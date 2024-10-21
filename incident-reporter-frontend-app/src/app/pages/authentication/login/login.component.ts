import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from 'src/app/services/auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit{

  constructor(private authService: AuthGoogleService) {}

  ngOnInit(): void {
      
  }

  handleSignInGoogle(){
    this.authService.login();
  }
}
