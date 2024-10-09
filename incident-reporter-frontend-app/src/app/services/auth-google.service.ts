import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(
    private oAuthService: OAuthService,
    private router: Router) 
    { 
      this.initConfiguration();
    }
  
  initConfiguration(){
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '',
      redirectUri: window.location.origin + '/map',
      scope: 'openid profile email'
    }

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.oAuthService.initImplicitFlow();
  }

  logout(){
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  getProfile(){
    console.log(this.oAuthService.getIdentityClaims());
    return this.oAuthService.getIdentityClaims();
  }

  getToken(){
    console.log(this.oAuthService.getAccessToken());
    return this.oAuthService.getAccessToken();
  }


}
