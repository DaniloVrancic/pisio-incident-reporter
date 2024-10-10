import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/services/auth-google.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [AuthGoogleService]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  identityClaims: any = null;
  profileToken: any = null;
  imageDOM : HTMLImageElement | null = null;
  loggedDom : HTMLElement | null = null;

  constructor(public dialog: MatDialog, public authService: AuthGoogleService, private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
      this.loggedDom = document.getElementById('logged-div');
      this.imageDOM = document.getElementById('profile-pic') as HTMLImageElement;
    

    if(this.authService.getProfile() != null){
      
      setTimeout(() => {
        let profile : any = this.authService.getProfile();
        console.log("SETTING PROFILE PIC");
        if(this.imageDOM){
          if(profile != null)
          {
            console.log("PROFILE EXISTS");
            this.imageDOM.src = profile.picture;
            console.log(this.imageDOM.src);
          }
          else{
            console.log("PROFILE IS NULL");
            this.imageDOM.src = "/assets/images/profile/default-user.png"
          }
          document.getElementById('profile-pic')?.replaceWith(this.imageDOM);
          if(this.loggedDom != null)
          this.loggedDom.innerHTML = "Logged In as: " + profile.name;
          this.cdr.detectChanges();
        }
      }, 1250)
        
    }
    else{
      if(this.loggedDom)
      this.loggedDom.innerHTML = "";
    }
      
  }

  printInfo(){
    console.log(this.authService.getProfile());
    console.log(this.authService.getToken());
  }
  handleLogoutClick(){
    this.authService.logout();
    this.router.navigateByUrl('/authentication/login');
  }
}
