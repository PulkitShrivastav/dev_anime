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
  <app-header-comp />
  <app-common-mssg-bar />
  <router-outlet />

  <!-- <button class="absolute top-0 left-0 h-[80px] w-[200px] bg-[white] text-[black] z-[5000]"
  (click)="trigger()">
    Trigger
  </button> -->

  `,
  styles: `
  `
})

export class App {

  constructor(private http: HttpClient) { }

  appSyncServ = inject(AppSyncService)
  commonMssgServ = inject(CommonMssgService)

  @HostListener('document:keydown', ['$event'])
  checkESC($event: Event) {
    const keyEvent = $event as KeyboardEvent
    if (keyEvent.key === 'Escape') {
      if (this.appSyncServ.editModeOn()) {
        this.appSyncServ.editModeOn.set(false)
        this.commonMssgServ.commonMssgHide()
      } else if (this.appSyncServ.renameMyFiles()) {
        this.appSyncServ.renameMyFiles.set(false)
        this.commonMssgServ.commonMssgHide()
      }
    }
  }

  ngOnInit() {
    gsap.set('#commonMssgBar', {
      y: -100,
      opacity: 0,
    })
  }

  ngAfterViewInit() {
    if (!this.appSyncServ.editModeOn()) {
      this.commonMssgServ.commonMssgHide()
    }
  }

  isLoggedIn = signal<boolean>(false)
  clicked = false

  // trigger() {

  //   if (this.clicked) {

  //   } else {

  //   }

  //   this.clicked = !this.clicked

  // }


}