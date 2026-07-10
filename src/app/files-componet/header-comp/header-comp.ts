import { Component, inject, signal, input } from '@angular/core';
import { NavButtonComp } from '../navButtonComp/navButtonComp';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from "@angular/common";
import { gsap } from 'gsap/gsap-core';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { PopUpService } from '../../AppServices/pop-up-service';
import { UserServices } from '../../AppServices/user-services';
import { HttpClient } from '@angular/common/http';

type response = {
  message: string,
}

@Component({
  selector: 'app-header-comp',
  imports: [NavButtonComp, RouterLink, NgClass],
  template: `
  <!--  -->
    <div id="navBar" class="relative m-2 flex items-center justify-between rounded-md z-[2000]"
    [ngClass]="appSyncServ.isFileRouteActive() ? 'bg-[#2a283d]' : 'bg-[#474554]' ">
      <!--  -->
      <div class="p-2 cursor-pointer" [routerLink]="['/home']"
      [ngClass]="appSyncServ.isFileRouteActive() ? 'text-[#d79fba]' : 'text-[white]/80' ">
        <span class="exile text-[24px]">D</span>
        <span class="exile text-[16px]">ev_</span>
        <span class="exile text-[24px]">A</span>
        <span class="exile text-[16px]">nime</span>
      </div>
      <div class="w-fit text-[white] text-sm josefin mr-2 flex items-center gap-2">
        <!-- <app-nav-buttons title="Home"  /> -->
         <div>{{getUsername()}}</div>
        @if(userServ.isLoggedIn()){
          <app-nav-buttons title="logout" (buttonClick)="logout()" />
        }
         <!-- @else {
          <app-nav-buttons [routerLink]="['/login']" title="Login" />
        } -->
    </div>
  `,
  styles: ``,
})
export class HeaderComp {

  constructor(private http: HttpClient, private router: Router) { }

  appSyncServ = inject(AppSyncService)
  popUpServ = inject(PopUpService)
  userServ = inject(UserServices)

  getUsername() {
    const firstname = this.userServ.user_login_details.firstname ?? ''
    const lastname = this.userServ.user_login_details.lastname ?? ''
    if (firstname && lastname) {
      return `${firstname} ${lastname}`
    }
    return 'Login'
  }

  logout() {
    this.http.get<response>("/api/logout", { withCredentials: true }).subscribe(data => {
      if (data.message === 'success') {
        localStorage.clear()
        this.userServ.user_login_details.guest_id = 0
        this.userServ.user_login_details.email_address = ''
        this.userServ.user_login_details.firstname = ''
        this.userServ.user_login_details.lastname = ''
        this.userServ.isLoggedIn.set(false)
        this.router.navigate(['login'])
      }
    })
  }

  myanime() {
    gsap.from('#navBar', {
      y: -50,
      duration: 1.8,
      ease: 'elastic.out'
    })
  }

  animeFunc() {
    this.myanime()
  }

  ngOnInit() {
    this.myanime()
  }

}
