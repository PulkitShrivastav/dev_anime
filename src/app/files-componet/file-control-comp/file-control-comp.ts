import { Component, signal, input, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-file-control-comp',
  imports: [NgClass],
  template: `
    <div (pointerenter)="hovers = true"
        (pointerleave)="hovers = false"
        (click)="changeControlDivs()"
        [ngClass]="getMyClass()">
        <div class=" flex flex-col items-center"
          [ngClass]="getControl()">
            <span>{{myName()}}</span>
            <!-- <div [id]="myIdentifier()" class="w-[50px] rounded-full h-[2px] bg-[#ded6b4]"></div> -->
            <!-- [ngClass]="appSyncServ.selectedControl() === myIdentifier() ? 'selectIdent' : null" -->
        </div>
    </div>
  `,
  styles: `
  
  .controlButtons{
    font-weight: 800;
    color: #ded6b4;
    transition: all 0.5s;
  }

  .controlDiv{
    font-weight: 500;
    color: #ded6b4bf;
    transition: all 0.5s;
  }

  .controlButtonsSelected{
    color: #ded6b4;
    transition: all 0.5s;
  }

  // .selectIdent{
  //   background-color: #ded6b4;
  // }
  
  `,
})
export class FileControlComp {

  appSyncServ = inject(AppSyncService)
  hovers = false
  myName = input.required<string>()
  myIdentifier = input.required<string>()
  borderClass = input.required<string>()

  changeControlDivs() {
    this.appSyncServ.selectedControl.set(this.myIdentifier())
    this.animateMyIdentifier()
  }

  getMyClass() {
    let myClass = "p-2 text-[14px] w-full text-[#ded6b4]/70 text-center quicksand"
    myClass = myClass + " " + this.borderClass()
    if (this.hovers) {
      myClass + ' controlHoverBg'
    } else {
      if (this.myIdentifier() === this.appSyncServ.selectedControl()) {
        myClass + ' controlHoverBg'
      }
    }
    return myClass
  }

  getID() {
    return `${this.myIdentifier()}_div`
  }

  getControl() {
    if (this.myIdentifier() === this.appSyncServ.selectedControl()) {
      return 'controlButtonsSelected'
    } else {
      if (this.hovers) {
        return 'controlButtons'
      } else {
        return 'controlDiv'
      }
    }
  }

  animateMyIdentifier() {
    const appearID = `#${this.myIdentifier()}`
    let disappearID = ''
    gsap.to(appearID, {
      scaleX: 1,
      opacity: 1,
      duration: 0.2,
      ease: 'linear'
    })
    for (let i of this.appSyncServ.fileControlIdentifires) {
      if (i !== this.appSyncServ.selectedControl()) {
        disappearID = `#${i}`
      }
    }
    gsap.to(disappearID, {
      scaleX: 0,
      opacity: 0,
      duration: 0.2,
      ease: 'linear'
    })
  }

  ngAfterViewInit() {
    if (this.myIdentifier() !== this.appSyncServ.selectedControl()) {
      let id = `#${this.myIdentifier()}`
      gsap.set(id, {
        scaleX: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'linear'
      })
    }
  }

}
