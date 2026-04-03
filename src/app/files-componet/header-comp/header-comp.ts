import { Component, inject, signal, input } from '@angular/core';
import { NavButtonComp } from '../navButtonComp/navButtonComp';
import { RouterLink } from '@angular/router';
import { NgClass } from "@angular/common";
import { gsap } from 'gsap/gsap-core';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { PopUpService } from '../../AppServices/pop-up-service';

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
      <div class="w-fit text-[white] text-sm josefin mr-2">
        <app-nav-buttons [routerLink]="['/home']" title="Home"  />
        @if(isLoggedIn()){
          <app-nav-buttons title="Files"  />
        } @else {
          <app-nav-buttons [routerLink]="['/login']" title="Login" />
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class HeaderComp {

  isLoggedIn = signal<boolean>(false)
  appSyncServ = inject(AppSyncService)
  popUpServ = inject(PopUpService)

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
