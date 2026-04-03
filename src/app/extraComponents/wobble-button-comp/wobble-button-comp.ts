import { Component, input, output } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-wobble-button-comp',
  imports: [],
  template: `
    <button [id]="getMyID()" class="p-2 text-[white] w-full h-fit bg-[#d79fba] rounded-lg text-[10px]"
    (pointerenter)="onButtonHover()"
    (click)="trigger()">{{myName()}}</button>
  `,
  styles: ``,
})
export class WobbleButtonComp {

  myName = input.required<string>()
  clicked = output()

  trigger() {
    this.clicked.emit()
  }

  getMyID() {
    return `${this.myName}_id`
  }

  onButtonHover() {
    let tl = gsap.timeline()
    tl.to(`#${this.myName()}_id`, {
      rotate: 5,
      x: 5,
      duration: 0.08,
    })
    tl.to(`#${this.myName()}_id`, {
      rotate: -5,
      x: 0,
      duration: 0.08,
    })
    tl.to(`#${this.myName()}_id`, {
      rotate: 5,
      x: -5,
      duration: 0.08,
    })
    tl.to(`#${this.myName()}_id`, {
      rotate: -5,
      x: 0,
      duration: 0.08,
    })
    tl.to(`#${this.myName()}_id`, {
      rotate: 5,
      x: 5,
      duration: 0.08,
    })
    tl.to(`#${this.myName()}_id`, {
      rotate: -5,
      x: 0,
      duration: 0.08,
    })
    tl.to(`#${this.myName()}_id`, {
      rotate: 5,
      x: -5,
      duration: 0.08,
    })
    tl.to(`#${this.myName()}_id`, {
      rotate: -5,
      x: 0,
      duration: 0.08,
    })
    tl.to(`#${this.myName()}_id`, {
      rotate: 0,
      x: 0,
      duration: 0.08,
    })
  }
}
