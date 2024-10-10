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

  constructor(public dialog: MatDialog, public authService: AuthGoogleService, private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.imageDOM == null){
      this.imageDOM = document.getElementById('profile-pic') as HTMLImageElement;
    }
    console.log("AFTER INIT VIEW");

    if(this.authService.getProfile() != null){
      
      console.log("SETTING PROFILE PIC");
      setTimeout(() => {
        let profile : any = this.authService.getProfile();
        if(this.imageDOM){
          this.imageDOM.src = profile.picture;
          this.cdr.detectChanges();
        }
      }, 2000)
        
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
