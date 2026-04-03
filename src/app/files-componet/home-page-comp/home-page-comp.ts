import { Component, inject, signal } from '@angular/core';
import { RiseButton } from "../rise-button/rise-button";
import { NgClass } from "@angular/common";
import { gsap } from 'gsap';
import { LoginComp } from "../loginComp/loginComp";
import { PopUpComp } from "../popUpComp/popUpComp";
import { CheckService } from '../../Services/check-service';
import { RouterLink } from "@angular/router";
import { AppSyncService } from '../../AppServices/app-sync-service';
import { AppIntiateService } from '../../AppServices/app-intiate-service';
import { PopUpService } from '../../AppServices/pop-up-service';

@Component({
  selector: 'app-home-page-comp',
  imports: [RiseButton, NgClass, PopUpComp, RouterLink],
  template: `
    <app-popUp />
    <div [ngClass]="popUpServ.popUp() ? 'blur-[15px]' : null ">
      <div class="m-8 rounded-lg p-8 grid grid-cols-2 gap-4">
        <div class="border-2 border-[#6a7987] bg-[#2a283d] rounded-xl py-2 px-4">
          
          <div class="text-3xl text-[white]/70 px-4 py-1 border-b-2 border-[#6a7987] ">
            Login To Get Started
          </div>
          
          <div class="mt-4 px-2 josefin text-[14px] text-[#ded6b4]">
            <span class="text-xl underline text-[white]/80">Build. Animate. Ship — Faster Than Ever.</span>
            
            <br><br>
            
            <span>
              <span class="exile text-[12px]">Dev_Anime</span> 
              is a modern development workspace designed for developers who believe great user experiences
              are driven by motion, precision, and performance. Built on the power of GSAP and Tailwind — two libraries trusted 
              by industry professionals — the platform enables you to craft fluid animations, experiment with transitions, and 
              prototype interactive interfaces effortlessly.
            </span>
            
            <br><br>
            
            <span>
              Whether you're refining micro-interactions, testing layout behavior, or presenting UI concepts, 
              <span class="exile text-[12px]">Dev_Anime</span>
              provides a streamlined environment where creativity meets engineering. No heavy setup. No fragmented tooling. Just a focused 
              space to write, preview, and iterate on your ideas.
            </span>
            
            <br><br>
            
            <span>
              Log in to unlock your workspace, manage your snippets, and showcase your work across devices — making collaboration simpler
              and development more flexible.
            </span>
          
          </div>

          <div class="flex justify-end py-2 px-8">
            <app-rise-button [routerLink]="['/files']" (cusClick)="onClick()" buttonID="demo" label="Demo Mode"
            [width]="'w-[10vw]'" [padding]="'p-2'" />
          </div>

        </div>
        <div class="text-2xl text-[white] quicksand py-2 px-4 flex items-center justify-center">
          <div class="w-full">
            <!-- <app-login-comp /> -->
          </div>
        </div>
      </div>

      <div class="m-2 text-2xl text-[white] flex flex-col items-center">
        
        <div class="border-2 border-[#6a7987] rounded-xl bg-[#2a283d] py-2 w-[50vw] text-center text-2xl quicksand">
          Become a <span class="exile">Contributer.</span>
        </div>

        <div class="w-[80vw] mt-8 p-4 grid grid-cols-2 gap-4">
          <div class="w-full border-2 josefin text-[#ded6b4] text-[14px] leading-snug border-[#6a7987] rounded-xl p-4 bg-[#2a283d]">
            
            <span class="josefin text-xl text-[white]/80 underline">Built by a Developer — For Developers.</span>

            <br><br>

            <span>
              <span class="exile text-[12px]">Dev_Anime</span>
              was created by Pulkit Srivastava, a freelance developer passionate about building tools that simplify modern
              web development. What began as a personal solution — a way to access code seamlessly across devices and demonstrate 
              progress to clients without complex local setups — quickly evolved into a platform with broader potential.
            </span>

            <br><br>

            <span>
              Today, 
              <span class="exile text-[12px]">Dev_Anime</span>
              focuses on sharing interactive snippets and showcasing animated web sections using Vanilla JavaScript,
              Tailwind, and GSAP. The goal is simple: reduce friction between development, presentation, and collaboration.
            </span>

            <br><br>

            <span>
              But this is only the beginning.
            </span>

            <br><br>

            <span>
              The long-term vision is to expand 
              <span class="exile text-[12px]">Dev_Anime</span>
              into a full-scale development environment capable of supporting modern 
              frameworks such as Angular and React, enabling developers to build and demonstrate production-ready applications
              directly from the platform.
            </span>

            <br><br>

            <span>
              <span class="exile text-[12px]">Dev_Anime</span> 
              is being shaped with a community-first mindset. Thoughtful feedback, innovative ideas, and developer contributions 
              are always welcome. If you're passionate about developer tools, modern UI, or the future of web experiences, 
              you’re invited to help shape what comes next.
            </span>

            <div class="flex justify-end p-4">
              <app-rise-button buttonID="becomeDev" label="Share Feedback." [width]="'w-[10vw]'" [padding]="'p-2'" />
            </div>
          
          </div>

          <div class="p-8 flex flex-col justify-center items-center">

            <div id="mssgDiv" 
            class="text-[black] bg-[#2a283d] border-2 border-[#6a7987] h-[60%] w-[90%] rounded-2xl overflow-hidden p-4">
              <textarea 
              class="w-full h-full rounded-2xl outline-none caret-[#ffb703] p-4 text-[14px] josefin text-[#f7716a] log-scroll"
              placeholder="Type Your Feedback Here"
              [ngClass]="is_focused() ? 'bg-[#261f2c] placeholder-[#ded6b4]': 'bg-[#12091a] placeholder-[#ded6b4]/80'"
              (focus)="myFocus()"
              (blur)="myBlur()"></textarea>
            </div>

            <div class="w-full flex justify-end px-12 py-4">
              <app-rise-button buttonID="post" label="Start Conversation." 
              [width]="'w-[10vw]'" [padding]="'p-2'"/>
            </div>

          </div>        

        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class HomePageComp {

  appSyncServ = inject(AppSyncService)
  is_focused = signal<boolean>(false)
  appInitServ = inject(AppIntiateService)
  popUpServ = inject(PopUpService)

  mssgFloat: any = null

  checkServ = inject(CheckService)

  myFocus() {
    this.is_focused.set(true)
    clearInterval(this.mssgFloat)
  }

  onClick() {
    this.appSyncServ.isFileRouteActive.set(true)
  }

  myBlur() {
    this.is_focused.set(false)
    this.startFloating()
  }

  durtn = 0.5
  y_travel = -15

  ngOnInit() {
    this.startFloating()
  }

  ngOnDestroy() {
    clearInterval(this.mssgFloat)
  }

  startFloating() {
    let tl1 = gsap.timeline()
    tl1.to('#mssgDiv', {
      y: this.y_travel,
      duration: this.durtn,
      ease: "sine.inOut",
      yoyo: true
    })
    tl1.to('#mssgDiv', {
      y: 0,
      duration: this.durtn,
      ease: "sine.inOut",
      yoyo: true
    })
    this.mssgFloat = setInterval(() => {
      let tl = gsap.timeline()
      tl.to('#mssgDiv', {
        y: this.y_travel,
        duration: this.durtn,
        ease: "sine.inOut",
        yoyo: true
      })
      tl.to('#mssgDiv', {
        y: 0,
        duration: this.durtn,
        ease: "sine.inOut",
        yoyo: true
      })
    }, this.durtn * 2000 + 100)
  }

}
