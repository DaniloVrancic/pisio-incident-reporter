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
      clientId: '991341419524-nlbtqds1hbem08gmhrpgfoh7mns4dn9n.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/map',
      scope: 'openid profile email'
    }

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.oAuthService.initImplicitFlow();
    this.getProfile();
    this.getToken;
  }

  logout(){
    try{

      this.oAuthService.revokeTokenAndLogout();
      this.oAuthService.logOut();
    }
    catch(error){
      console.log(error);
    }
  }

  getProfile(){
    return this.oAuthService.getIdentityClaims();
  }

  getToken(){
    return this.oAuthService.getAccessToken();
  }


}
