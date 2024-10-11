import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MapsSubscriptionContainer } from 'src/app/pages/map/map/map-subscriptions-container';
import { AuthGoogleService } from 'src/app/services/auth-google.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [AuthGoogleService]
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
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
  profileChangeObservable: Observable<any> | undefined;
  mySubs: MapsSubscriptionContainer = new MapsSubscriptionContainer();

  showModeratorOptions: boolean = false; //use this to show or hide options that are wanted to be used
  
  

  constructor(public dialog: MatDialog, public authService: AuthGoogleService, private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.profileChangeObservable = this.authService.onProfileChange();

    this.mySubs.add = this.profileChangeObservable.subscribe(result => {
      if(result == null){
        this.showModeratorOptions = false;
      }
      else{
        this.showModeratorOptions = true;
      }
      console.log("SHOW MODERATOR OPTIONS: " + this.showModeratorOptions);

    })
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loggedDom = document.getElementById('logged-div');
      this.imageDOM = document.getElementById('profile-pic') as HTMLImageElement;
  
      this.authService.publishProfile();
    });
  }

  ngOnDestroy(): void {
    this.mySubs.dispose();
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
