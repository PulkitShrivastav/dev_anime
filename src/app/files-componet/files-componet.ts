import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MyFilesComp } from "./myFilesComp/myFilesComp";
import { AppIntiateService } from '../AppServices/app-intiate-service';
import { AppSyncService } from '../AppServices/app-sync-service';
import { FilesService } from '../AppServices/files-service';
import { NgClass } from "@angular/common";
import { PopUpComp } from './popUpComp/popUpComp';
import { NavFileTab } from './nav-file-tab/nav-file-tab';
import { ConsoleComp } from './console-comp/console-comp';
import { PopUpService } from '../AppServices/pop-up-service';
import { gsap } from 'gsap/all';
import { Observer } from 'gsap/all';
import { Loader } from "./loader/loader";
import { CommonMssgService } from '../AppServices/common-mssg-service';
import { HttpClient } from '@angular/common/http';
import { UserServices } from '../AppServices/user-services';

gsap.registerPlugin(Observer)

type response = {
  message: string,
  data: {
    userID: number,
    firstname: string,
    lastname: string,
    user_email: string,
  }
}

@Component({
  selector: 'app-files-componet',
  imports: [MyFilesComp, NavFileTab, RouterOutlet, NgClass, PopUpComp, ConsoleComp, Loader],
  template: `

    <app-popUp  />
    @if (appInitServ.isLoaded()) {
      <div class="m-2 grid grid-cols-12 gap-2 items-center justify-items-center h-[90vh]"
        [ngClass]="popUpServ.popUp() ? 'blur-[15px]' : null ">
        
        <!-- Grid-Column-1 -->
        <div class="w-full h-full col-span-9 row-span-4" >

          <div #my_ref class="flex h-[35px] w-full overflow-x-scroll overflow-y-hidden hide-scrollbar">
            @for ( file of appSyncServ.openedFiles(); track $index){
              <app-nav-file-tab [myFilename]="file.file_name" />
            }
          </div>

          @if (this.appSyncServ.allFiles().length === 0) {
            <div>
              <div class="text-[white]">MyFiles.</div>
            </div>
          }
          <router-outlet />

        </div>
        
        <!-- Grid-Column-2 -->
        <div class="w-full h-full col-span-3 row-span-4" >

          <app-my-files />

          <app-console-comp />

        </div>

      </div>
    } @else {
      <div class="flex items-center justify-center gap-4 h-[70vh]">
        <div class="text-white gap-0 h-fit">
          <div class="w-fit loader"></div>
          <div class="w-fit quicksand flex items-center justify-center gap-2">
            <div class="text-[1.2rem]">Loading</div>
          </div>
        </div>
      </div>
    }

  `,
  styles: `
  .hide-scrollbar {
    scrollbar-width: none;      /* Firefox */
    -ms-overflow-style: none;   /* IE/Edge */
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;              /* Chrome, Safari, Edge */
  }

  .loader {
  --color-1: #E5FBB5;
  --color-2: #C07A64;
  --size: 0.9px;

  background: transparent;
  box-shadow: none;
  width: calc(48 * var(--size));
  height: calc(48 * var(--size));
  display: block;
  margin: calc(15 * var(--size)) auto;
  position: relative;
  color: var(--color-1);
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after,
.loader::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  width: calc(24 * var(--size));
  height: calc(24 * var(--size));
  top: 0;
  background-color: var(--color-1);
  border-radius: 50%;
  animation: scale50 1s infinite ease-in-out;
}
.loader::before {
  top: auto;
  bottom: 0;
  background-color: var(--color-2);
  animation-delay: 0.5s;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes scale50 {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}


  `,
})
export class FilesComponet {

  @ViewChild('my_ref') my_ref!: ElementRef<HTMLDivElement>

  constructor(private http: HttpClient, private router: Router) { }

  appSyncServ = inject(AppSyncService)
  appInitServ = inject(AppIntiateService)
  fileServ = inject(FilesService)
  popUpServ = inject(PopUpService)
  commonMssgServ = inject(CommonMssgService)
  userServ = inject(UserServices)

  async setUser() {
    console.log('setUser called')
    this.http.get<response>("api/check_login", { withCredentials: true }).subscribe(data => {
      if (data.message === "success") {
        console.log('response came', data)
        const userData = data.data
        this.userServ.user_login_details.email_address = userData.user_email
        this.userServ.user_login_details.guest_id = userData.userID
        this.userServ.user_login_details.firstname = userData.firstname
        this.userServ.user_login_details.lastname = userData.lastname
        // this.loginChecked.set(true)
        this.userServ.isLoggedIn.set(true)
        console.log(this.userServ.user_login_details)
        // this.router.navigate(['files'])
        this.prototype()
      } else {
        this.userServ.isLoggedIn.set(true)
        // this.loginChecked.set(true)
      }
    })
  }

  async prototype() {
    this.appInitServ.InitiateWebApp()
    this.appSyncServ.isFileRouteActive.set(true)
    this.commonMssgServ.commonMssgHide()
  }

  ngOnInit() {
    this.setUser()
  }

  // ngAfterViewInit() {

  //   Observer.create({
  //     target: this.my_ref.nativeElement,

  //     type: "wheel,touch,pointer",

  //     preventDefault: true,

  //     onChange: (self) => {
  //       this.my_ref.nativeElement.scrollLeft += self.deltaX + self.deltaY;
  //     }
  //   });

  // }

}
