import { Component, ElementRef, inject, output, signal, viewChild, ViewChild, } from '@angular/core';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { gsap } from 'gsap';
import { NgClass } from "@angular/common";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonMssgService } from '../../AppServices/common-mssg-service';
import { MyUsers } from '../../Services/models';

@Component({
  selector: 'app-login-comp',
  imports: [NgClass, ReactiveFormsModule],
  template: `

    <div class="relative top-0 left-0 w-[100%] z-[100]">
      <div class="p-1 relative overflow-hidden rounded-lg">
      <div class="relative z-[4] h-full w-full rounded-lg bg-[#F5F5F5] overflow-hidden border-2 border-[#474554]">
        <div class="w-full p-4 text-[white] text-[14px] quicksand font-medium bg-[#474554]">Log In.</div>
        <div class="w-full h-[50vh] flex flex-col items-center justify-center">
          <div class="m-2">
            <div class="text-[10px] w-fit bg-[#474554] text-[white] font-bold rounded-t-lg p-2">Email Address</div>\
            <input #userDiv [formControl]="username" type="text" spellcheck="false" 
            (focus)="focusAnime('username')"
            (blur)="blurAnime('username')"
            class="h-[3rem] selection:bg-[#aca9bb] selection:text-[white] border-2 border-[#474554] text-[16px] josefin p-2 
            outline-none bg-[#aca9bb]/30 rounded-r-lg rounded-b-lg caret-[#ff9d69] text-[#ff9d69] w-[30rem]">
          </div>
          <div class="m-2 relative">
            <div class="text-[10px] w-fit bg-[#474554] text-[white] font-bold rounded-t-lg p-2">Password</div>\
            <input #passDiv [formControl]="password" type="password"
            (focus)="focusAnime('password')" 
            (blur)="blurAnime('password')"
            class="selection:bg-[#aca9bb] selection:text-[white] h-[3rem] border-2 border-[#474554] text-[16px] josefin p-2 
            outline-none bg-[#aca9bb]/30 rounded-r-lg rounded-b-lg caret-[#ff9d69] text-[#ff9d69] w-[30rem]">
            <div class="absolute top-1 right-5 svg" [ngClass]="visibilty() ? 'hidden' : null "
            (click)="handleVisible('on')">
              <svg class="w-[1.5rem]" viewBox="0 -960 960 960" >
                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
              </svg>
            </div>
            <div class="absolute top-1 rounded-full right-5 svgSelected" [ngClass]="visibilty() ? null : 'hidden' " 
            (click)="handleVisible('off')">
              <svg class="w-[1.5rem]" viewBox="0 -960 960 960">
                <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/>
              </svg>
            </div>
          </div>
          <div class="w-full flex items-center quicksand justify-center gap-4 mt-8">
              <button id="login" 
              (pointerenter)="pointEnter('login')" 
              (pointerleave)="pointLeave('login')"
              (click)="login()">
                <span class="block" id="login_text">Login</span>
              </button>
              
              <button id="signup" (click)="signUp.emit()" 
              (pointerenter)="pointEnter('signup')" 
              (pointerleave)="pointLeave('signup')">
                <span class="block" id="signup_text">Sign Up</span>
              </button>
              
              <button id="forgot" (click)="forgot.emit()"
              (pointerenter)="pointEnter('forgot')" 
              (pointerleave)="pointLeave('forgot')">
                <span class="block" id="forgot_text">Forgot Password</span>
              </button>
          </div>
          <div (click)="demoMode()"
          class="cursor-pointer flex flex-col items-center w-fit text-[#ff9d69] font-bold italic px-2 mt-4 text-[12px] text-center">
            <span id="demo" (pointerenter)="pointOnDemo('enter')"
            (pointerleave)="pointOnDemo('leave')" class="inline-block py-1 px-2 rounded-lg demo_mode">
            Demo Mode</span>
            <span id="demoUnderline" class="w-[100%] h-[1px] bg-[#2a2a2a]"></span>
          </div>
        </div>
      </div>
    </div>
    </div>

  `,
  styles: `
    button{
      background-color: rgba($color: #aca9bb, $alpha: 0.6);
      border-radius: 0.5rem;
      padding: 0.5rem;
      width: 10rem;
      color: #474554;
      font-weight: 600;
      transition: all 0.5s;
    }

    .demo_mode{
      background-color: transparent;
      color: #ff9d69;
      transition: all 0.5s;
    }

    .demo_mode:hover{
      background-color: #ff9d69;
      color: white;
      transition: all 0.5s;
    }

    button:hover{
      background-color: #ff9d69;
      color: white;
      transition: all 0.5s;
    }

    .svg{
      fill: #2a2a2a;
      transition: all 0.5s;
    }

    .svg:hover{
      fill: #ff9d69;
      transition: all 0.5s;
    }

    .svgSelected{
      fill: #ff9d69;
      transition: all 0.5s;
    }
  `,
})

export class LoginComp {

  @ViewChild('passDiv') passDiv!: ElementRef<HTMLInputElement>
  @ViewChild('userDiv') userDiv!: ElementRef<HTMLInputElement>

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  anmtd_divs!: Record<'password' | 'username', HTMLInputElement>
  appSyncServ = inject(AppSyncService)
  visibilty = signal(false)
  forgot = output()
  signUp = output()
  username = new FormControl()
  password = new FormControl()
  commonMssgServ = inject(CommonMssgService)

  pointEnter(id: string) {
    gsap.to(`#${id}`, {
      y: -10,
      duration: 0.3,
      ease: 'linear'
    })
    gsap.to(`#${id}_text`, {
      y: -5,
      duration: 0.3,
      delay: 0.2,
      ease: 'linear'
    })
  }

  pointLeave(id: string) {
    gsap.to(`#${id}`, {
      y: 0,
      duration: 0.3,
      ease: 'linear'
    })
    gsap.to(`#${id}_text`, {
      y: 0,
      duration: 0.3,
      delay: 0.2,
      ease: 'linear'
    })
  }

  handleVisible(state: 'on' | 'off') {
    if (state === 'on') {
      this.visibilty.set(true)
      this.passDiv.nativeElement.type = 'text'
    } else if (state === 'off') {
      this.visibilty.set(false)
      this.passDiv.nativeElement.type = 'password'
    }
  }

  demoMode() {
    this.http.put<MyUsers>('/api/user/demo-login', {}, { withCredentials: true }).subscribe(data => {
      if (data.message === 'Demo-Login') {
        this.commonMssgServ.popMessage('Demo Login, Please wait.')
        setTimeout(() => {
          this.commonMssgServ.commonMssgHide()
          this.router.navigate(['/files'])
        }, 1000)
      }
    })
  }

  focusAnime(divID: 'password' | 'username') {
    const animeParams = {
      COLOR: '#6177ec',
      DURATION: 0.5,
      EASE: 'power1.out'
    }
    gsap.to(this.anmtd_divs[divID], {
      borderColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
    })
  }

  blurAnime(divID: 'password' | 'username') {
    const animeParams = {
      COLOR: '#2a2a2a',
      DURATION: 0.5,
      EASE: 'power1.out'
    }
    gsap.to(this.anmtd_divs[divID], {
      borderColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
    })
  }

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

  errorAnime(state: 'warning' | 'error' | 'success') {
    const myColors = {
      warning: '#ffb1a3',
      success: '#a8c3a3',
      error: '#c44f68'
    }
    const ANIMEPARAMS = {
      COLOR: myColors[state],
      DURATION: 0.3,
      EASE: 'linear'
    }
    Object.values(this.anmtd_divs).forEach((element: HTMLInputElement) => {
      {
        gsap.to(element, {
          borderColor: ANIMEPARAMS.COLOR,
          duration: ANIMEPARAMS.DURATION,
          ease: ANIMEPARAMS.EASE,
        })
      }
    })
  }

  login() {
    const username = this.username.value
    const password = this.password.value
    if (!username || !password) {
      this.commonMssgServ.popMessage('Please Fill The Fields.')
      this.errorAnime('warning')
      setTimeout(() => {
        this.commonMssgServ.commonMssgHide()
      }, 1000)
    } else {
      this.http.put<MyUsers>('/api/user/login', {
        email_address: username,
        password: password
      }, { withCredentials: true }).subscribe(data => {
        if (data.message === 'Failed') {
          this.username.setValue('')
          this.password.setValue('')
          this.commonMssgServ.popMessage('Wrong Credentials.')
          this.errorAnime('error')
          setTimeout(() => {
            this.commonMssgServ.commonMssgHide()
          }, 1000)
        } else {
          this.commonMssgServ.popMessage('Success')
          this.errorAnime('success')
        }
      })
    }

  }


  ngAfterViewInit() {
    this.appSyncServ.isFileRouteActive.set(false)
    gsap.set('#demoUnderline', {
      scaleX: 0
    })
    this.anmtd_divs = {
      password: this.passDiv.nativeElement,
      username: this.userDiv.nativeElement
    }
  }

  ngOnInit() {

  }

}
