import { Component, inject, signal } from '@angular/core';
import { LoginComp } from "../loginComp/loginComp";
import { SingUpComp } from "../sing-up-comp/sing-up-comp";
import { VerifyOTPComp } from "../verify-otpcomp/verify-otpcomp";
import { ForgotPassComp } from '../forgot-pass-comp/forgot-pass-comp';
import { ResetPassComp } from '../reset-pass-comp/reset-pass-comp';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonMssgService } from '../../AppServices/common-mssg-service';
import { PopUpService } from '../../AppServices/pop-up-service';

@Component({
  selector: 'app-user-comp',
  imports: [LoginComp, SingUpComp, VerifyOTPComp, ForgotPassComp, ResetPassComp, NgClass],
  template: `
    <div class="relative top-[10%] z-[500] w-[1536px] bg-[green]">
      <div class="absolute w-[400px] top-0 right-0 text-[14px] font-extrabold bg-[black] text-[white]
    m-4 rounded-lg flex items-center justify-center gap-4 p-4">
      <span (click)="clicked('login')">login</span>
      <span (click)="clicked('signup')">signup</span>
      <span (click)="clicked('verify')">verify</span>
      <span (click)="clicked('forgot')">forgot</span>
      <span (click)="clicked('reset')">reset</span>
      <span (click)="trigger()">trigger</span>
    </div>
    </div>
    <div class="absolute quicksand flex items-center justify-center top-0 h-[100vh] w-[1536px] bg-[#F5F5F5]">
        @if (selectedComp() === 'login'){
          <div class="relative">
            <div  (click)="handleBack()" class="absolute top-0 right-0 z-[5] m-2 rounded-full" 
            [ngClass]="selectedComp() === 'login' ? 'BackDACTV cursor-default' : 'BackACTV cursor-pointer' ">
              <svg viewBox="0 -960 960 960" width="2rem">
                <path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
            </div>
            <app-login-comp (signUp)="selectedComp.set('signup')" (forgot)="selectedComp.set('forgot')" />
          </div>
        } @else if (selectedComp() === 'signup') {
          <div class="relative">
            <div  (click)="handleBack()" class="absolute top-0 right-0 z-[5] m-2 rounded-full" 
            [ngClass]="selectedComp() === 'login' ? 'BackDACTV cursor-default' : 'BackACTV cursor-pointer' ">
              <svg viewBox="0 -960 960 960" width="2rem">
                <path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
            </div>
            <app-sing-up-comp (verify)="selectedComp.set('verify')" />
          </div>
        } @else if (selectedComp() === 'verify'){
          <div class="relative">
            <div  (click)="handleBack()" class="absolute top-0 right-0 z-[5] m-2 rounded-full" 
            [ngClass]="selectedComp() === 'login' ? 'BackDACTV cursor-default' : 'BackACTV cursor-pointer' ">
              <svg viewBox="0 -960 960 960" width="2rem">
                <path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
            </div>
            <app-verify-otpcomp />
          </div>
        } @else if (selectedComp() === 'forgot') {
          <div class="relative">
            <div  (click)="handleBack()" class="absolute top-0 right-0 z-[5] m-2 rounded-full" 
            [ngClass]="selectedComp() === 'login' ? 'BackDACTV cursor-default' : 'BackACTV cursor-pointer' ">
              <svg viewBox="0 -960 960 960" width="2rem">
                <path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
            </div>
            <app-forgot-pass-comp (verify)="handlerFromForgot()" />
          </div>
        } @else if (selectedComp() === 'reset') {
          <div class="relative">
            <div  (click)="handleBack()" class="absolute top-0 right-0 z-[5] m-2 rounded-full" 
            [ngClass]="selectedComp() === 'login' ? 'BackDACTV cursor-default' : 'BackACTV cursor-pointer' ">
              <svg viewBox="0 -960 960 960" width="2rem">
                <path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
            </div>
            <app-reset-pass-comp />
          </div>
        }
    </div>
  `,
  styles: `
  
  span{
    color: #fff;
    transition: all 0.3s;
    cursor: pointer;
  }

  span:hover{
    color: rgba($color: #fff, $alpha: 0.8);
    transition: all 0.3s;
  }

  .BackDACTV{
    fill: rgba($color: #aca9bb, $alpha: 0.3);
    transition: all 0.3s;
  }

  .BackACTV{
    fill: rgba($color: #aca9bb, $alpha: 1);
    transition: all 0.3s;
  }

  .BackACTV:hover{
    fill: white;
    transition: all 0.3s;
  }
  
  `,
})

export class UserComp {
  selectedComp = signal<DIVS>('login')
  cameFromForgot = signal(false)
  comoonMssgServ = inject(CommonMssgService)
  popUpServ = inject(PopUpService)

  constructor(private http: HttpClient) { }

  clicked(_ID: DIVS) {
    this.selectedComp.set(_ID)
  }

  handleBack() {
    const myDivs: DIVS[] = ['login', 'signup', 'verify', 'forgot', 'reset']
    if (this.selectedComp() === 'forgot') {
      this.selectedComp.set('login')
    } else if (this.selectedComp() === 'verify' && this.cameFromForgot()) {
      this.selectedComp.set('forgot')
      this.cameFromForgot.set(false)
    } else if (this.selectedComp() === 'verify') {
      this.selectedComp.set('signup')
    } else if (this.selectedComp() === 'reset') {
      this.selectedComp.set('verify')
    } else if (this.selectedComp() === 'signup') {
      this.selectedComp.set('login')
    }
  }

  handlerFromForgot() {
    this.selectedComp.set('verify')
    this.cameFromForgot.set(true)
  }

  // count = 0

  trigger() {
    // this.popUpServ.openPopUp('error')
  }

}

type DIVS = 'login' | 'signup' | 'verify' | 'forgot' | 'reset' 