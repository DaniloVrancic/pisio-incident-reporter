import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  private profileSubject = new BehaviorSubject<any>(null);

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
      redirectUri: window.location.origin + '/description',
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
    try{
      this.oAuthService.revokeTokenAndLogout();
      this.oAuthService.logOut();
      this.profileSubject.next(null)
    }
    catch(error){
      console.log(error);
    }
  }

  isLoggedIn(): boolean{
    if(this.getProfile() != null && this.getToken() != null){
      return true;
    }
    else{
      return false;
    }
  }

  getProfile(){
    return this.oAuthService.getIdentityClaims();
  }

  getToken(){
    return this.oAuthService.getAccessToken();
  }

  onProfileChange() {
    return this.profileSubject.asObservable(); // Observable for profile updates
  }

  publishProfile(){
    this.profileSubject.next(this.getProfile());
  }


}
