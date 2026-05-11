import { Component, HostListener, inject, signal, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComp } from "./files-componet/header-comp/header-comp";
import { HttpClient } from '@angular/common/http';
import { AppSyncService } from './AppServices/app-sync-service';
import { CommonMssgBar } from './files-componet/common-mssg-bar/common-mssg-bar';
import { gsap } from 'gsap';
import { CommonMssgService } from './AppServices/common-mssg-service';
import { Loader } from "./files-componet/loader/loader";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComp, CommonMssgBar, Loader],
  template: `
  <div class="wrapper" [class.desktopSite]="widthOK()">
    <app-header-comp />
  <app-common-mssg-bar />
  @if(widthOK()){
      <router-outlet />
  }

  <!-- <button class="absolute top-0 left-0 h-[80px] w-[200px] bg-[white] text-[black] z-[5000]"
  (click)="trigger()">
    Trigger
  </button> -->

  @if(!widthOK()){
    <div class="absolute bg-white top-0 left-0 border-10px border-red h-full w-full z-[100] flex items-center justify-center">
      <div class="w-full m-2 sm:w-[60vw] sm:rounded-2xl sm:border-2 sm:border-[#474554] 
                  sm:bg-[#aca9bb]/80 flex-col justify-center">
        <div class="text-[#474554] exile text-center py-2 px-4 border-b-2 border-[#474554] text-[16px]">Important Note</div>
        <div class="text-[#474554] p-6 text-[12px] quicksand">
          We’d like to let you know that the mobile and tablet versions of this tool are currently under development.
          <br><br>We’re actively working on delivering a seamless, mobile-friendly experience, which will be available in an 
          upcoming update.<br><br>We appreciate your interest and patience—thank you for visiting, and happy coding!
        </div>
        <div class="flex justify-center h-fit p-4">
          <div (click)="desktopMode()"
          class="cursor-pointer flex flex-col items-center w-fit text-[#ff9d69] font-bold josefin px-2 mt-4 
          text-[12px] text-center">
            <span id="demo" (pointerenter)="pointOnDemo('enter')"
            (pointerleave)="pointOnDemo('leave')" class="inline-block text-[12px] py-1 px-2 rounded-lg demo_mode">
            Continue to Desktop Site.</span>
            <span id="demoUnderline" class="w-[100%] h-[1px] bg-[#474554]/50"></span>
          </div>
        </div>
      </div>
    </div>
  }
  <div>
  `,
  styles: `

  .demo_mode{
      background-color: #474554;
      color: white;
      transition: all 0.5s;
    }

  .demo_mode:hover{
      background-color: rgba($color: #474554, $alpha: 0.5);
      color: white;
      transition: all 0.5s;
    }

  .wrapper.desktopSite {
      width: 1536px;
      margin: 0 auto;
  }

  .wrapper{
    width: 100%;
  }

  `
})

export class App {

  constructor(private http: HttpClient) { }

  appSyncServ = inject(AppSyncService)
  commonMssgServ = inject(CommonMssgService)
  widthOK = signal<boolean>(true)
  viewportWidht = window.innerWidth
  allowedWidth = 1130

  @HostListener('document:keydown', ['$event'])
  checkESC($event: Event) {
    const keyEvent = $event as KeyboardEvent
    if (keyEvent.key === 'Escape') {
      if (this.appSyncServ.editModeOn()) {
        this.appSyncServ.editModeOn.set(false)
      } else if (this.appSyncServ.renameMyFiles()) {
        this.appSyncServ.renameMyFiles.set(false)
      }
      this.commonMssgServ.commonMssgHide()
    }
  }

  ngOnInit() {
    gsap.set('#commonMssgBar', {
      y: -100,
      opacity: 0,
    })
    console.log(window.innerWidth, window.innerHeight)
    if (this.viewportWidht < this.allowedWidth) {
      this.widthOK.set(false)
    }
  }

  ngAfterViewInit() {
    if (!this.appSyncServ.editModeOn()) {
      this.commonMssgServ.commonMssgHide()
    }
  }

  desktopMode() {
    this.widthOK.set(true)
  }

  isLoggedIn = signal<boolean>(false)
  clicked = false

  // trigger() {

  //   if (this.clicked) {

  //   } else {

  //   }

  //   this.clicked = !this.clicked

  // }

  pointOnDemo(state: 'enter' | 'leave') {
    if (state === 'enter') {
      gsap.to('#demo', {
        y: -10,
        duration: 0.3,
        ease: 'linear'
      })
      gsap.to('#demoUnderline', {
        scaleX: 1,
        duration: 0.3,
        ease: 'linear'
      })
    } else if (state === 'leave') {
      gsap.to('#demo', {
        y: 0,
        duration: 0.3,
        ease: 'linear'
      })
      gsap.to('#demoUnderline', {
        scaleX: 0,
        duration: 0.3,
        ease: 'linear'
      })
    }
  }


}