import { Component, computed, inject, input, output } from '@angular/core';
import { gsap } from 'gsap';
import { NgClass } from "@angular/common";
import { AppIntiateService } from '../../AppServices/app-intiate-service';

@Component({
  selector: 'app-rise-button',
  imports: [NgClass],
  template: `
    <button [id]="myID('butn')" [ngClass]="myClass()"
      style="font-weight: 800;"
      (pointerenter)="onEnter()"
      (pointerleave)="onLeave()"
      (click)="onCusClick()">
      
      <span [id]="myID('text')" class="inline-block whitespace-nowrap">{{label()}}</span>
    
    </button>
  `,
  styles: ``,
})
export class RiseButton {

  label = input.required<string>()
  buttonID = input.required<string>()
  cusClick = output()
  width = input<string>('w-auto')
  padding = input<string>('p-2')
  myClass = computed(() => `${this.width()} ${this.padding()} text-[14px] rounded-lg bg-[#d79fba]/70 quicksand text-[white]/50 border-2 border-[transparent]`)
  appInitServ = inject(AppIntiateService)
  butnID = ''
  textID = ''

  onCusClick() {
    this.cusClick.emit()
  }

  myID(que: string) {
    if (que === 'butn') {
      this.butnID = `${this.buttonID()}_butn`
      return this.butnID
    } else {
      this.textID = `${this.buttonID()}_text`
      return this.textID
    }
  }

  onEnter() {
    gsap.to(`#${this.butnID}`, {
      y: -5,
      backgroundColor: '#d79fba',
      duration: 0.5
    })
    gsap.to(`#${this.textID}`, {
      y: -3,
      color: 'white',
      duration: 0.5
    })
  }

  onLeave() {
    gsap.to(`#${this.butnID}`, {
      y: 0,
      backgroundColor: 'rgba(215, 159, 186, 0.7)',
      duration: 0.5
    })
    gsap.to(`#${this.textID}`, {
      y: 0,
      color: 'rgba(255, 255, 255, 0.5)',
      duration: 0.5
    })
  }

}
