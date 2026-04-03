import { Component, signal, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger, Draggable, Flip, Observer } from 'gsap/all';

@Component({
  selector: 'app-carousel-anime',
  imports: [CommonModule, RouterLinkWithHref],
  template: `
   <!--  -->

  
      
  <div class="flex flex-col items-center w-full">

    <div class="w-full h-[100vh] grid grid-cols-5">

      <div class="h-full relative bg-[#23384a] text-[white] p-4 w-full">
          <button (click)="buttonClick()" (click)="playAnimeNxt()" class="josefin bg-slate-500 absolute top-1 right-1 p-2 text-[white] w-fit text-center rounded-xl">
            Next Div
          </button>
          <button (click)="buttonClick()" (click)="playAnimePrev()" class="josefin bg-slate-500 absolute top-1 left-1 p-2 text-[white] w-fit text-center rounded-xl">
            Prev Div
          </button>
          <button (click)="buttonClick()" routerLink="/ganpati" class="josefin bg-slate-500 absolute top-1 left-[100px] p-2 text-[white] w-fit text-center rounded-xl">
            Show / Hide <!--(click)="clearIt()"-->
          </button>
          <span class="josefin"><br><br>|| Print Console Logger ||<br></span>
          <div class="h-[80vh] quicksand text-[12px]" [innerHTML]="printer()"></div>
      </div>

        <div class="relative col-span-4 w-full h-full bg-[black] overflow-hidden">
          @for (frame of contents; track $index){
            <div class="absolute w-full h-full p-4 gap-1 grid grid-cols-4 justify-items-center items-center">
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] col-span-2 h-[100px] rounded-md flex items-center justify-center" [id]="getID('box1',$index)" ><span class="text-center">Box-1-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] row-span-2 h-full w-[80%] rounded-md flex items-center justify-center" [id]="getID('box2',$index)" ><span class="text-center">Box-2-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] row-span-2 h-full w-[80%] rounded-md flex items-center justify-center" [id]="getID('box3',$index)" ><span class="text-center">Box-3-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] row-span-3 h-full w-[80%] rounded-md flex items-center justify-center" [id]="getID('box4',$index)" ><span class="text-center">Box-4-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] h-[100px] rounded-md flex items-center justify-center" [id]="getID('box5',$index)" ><span class="text-center">Box-5-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] col-span-2 h-[100px] rounded-md flex items-center justify-center" [id]="getID('box6',$index)" ><span class="tex-center">Box-6-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] h-[100px] rounded-md flex items-center justify-center" [id]="getID('box7',$index)" ><span class="tex-center">Box-7-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] h-[100px] rounded-md flex items-center justify-center" [id]="getID('box8',$index)" ><span class="text-center">Box-8-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] col-span-2 h-[100px] rounded-md flex items-center justify-center" [id]="getID('box9',$index)" ><span class="text-center">Box-9-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] col-span-2 h-[100px] rounded-md flex items-center justify-center" [id]="getID('box10',$index)" ><span class="text-center">Box-10-{{$index}}</span> </div>          
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] h-[100px] rounded-md flex items-center justify-center" [id]="getID('box11',$index)" ><span class="text-center">Box-11-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] row-span-2 h-full w-[80%] rounded-md flex items-center justify-center" [id]="getID('box12',$index)" ><span class="text-center">Box-12-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] h-[100px] rounded-md flex items-center justify-center" [id]="getID('box13',$index)" ><span class="text-center">Box-13-{{$index}}</span> </div>
                <div [style.background-color]="frame.color" class="opacity-0 box w-[90%] col-span-2 h-[100px] rounded-md flex items-center justify-center" [id]="getID('box14',$index)" ><span class="tex-center">Box-14-{{$index}}</span> </div>  
          </div>
          }
        </div>
    
    </div>

  </div>
  

  `,

  styles: `
  
  .test {
    border: 2px solid green,
  }
  
  button:hover {
    background-color: #94a3b8;
    transition: background-color 0.3s ease-out
  }

  `

})
export class CarouselAnime {

  ngAfterViewInit() {

    setTimeout(() => {
      let btDly1 = 0
      for (let frames of this.getbatchesArr(0).reverse()) {
        setTimeout(() => {
          let frmDly = 0
          for (let divs of frames) {
            setTimeout(() => {
              if (this.getRightArr(this.activeIndx).includes(divs)) {
                this.fromRight(divs)
              } else {
                this.fromLeft(divs)
              }
            }, frmDly)
            frmDly = frmDly + 300
          }
        }, btDly1);
        btDly1 = btDly1 + 600
      }
    }, 500)

    // setTimeout(() => {
    //   setInterval(() => {
    //     this.playAnimeNxt()
    //   }, 7000)
    // }, 600)

  }

  clearIt() {
    // this.printConsl("Inside clearIt()")
    this.activeIndx = 0
    this.prevIndx = this.contents.length - 1
    this.nxtIndx = 1

    for (let i = 0; i < this.contents.length; i++) {

      // this.printConsl(`Running for I = ${i}`)
      let btDly1 = 0
      for (let frames of this.getbatchesArr(i)) {
        let frmDly = 0
        for (let divs of frames) {
          if (i === 0) {
            // this.printConsl(`Running for Active Index`)
            setTimeout(() => {
              setTimeout(() => {
                this.fromRight(divs)
              }, frmDly)
            }, btDly1);
          } else {
            gsap.set(`#${divs}`, {
              opacity: 0
            })
          }

          frmDly = frmDly + 300

        }

        btDly1 = btDly1 + 600

      }

    }

  }



  printer = signal("");

  contents = [
    { color: "#7cc76b" },
    { color: "#fcad4c" },
    { color: "#c294ceff" },
    { color: "#9cc930" },
    { color: "#fc925d" },
    { color: "#d95d8f" },
    { color: "#85c5d4" },
    { color: "#af58cc" },
    { color: "#defc62" },
    { color: "#61b88a" },
    // { color: "#fc657e" },
    // { color: "#8d79bd" },
    // { color: "#cfb734" },
    // { color: "#af7ac2" },
  ]

  buttonClick() {
    // this.printConsl("Button Clicked.")
  }

  printConsl(que: string) {
    let prevcont = this.printer();
    this.printer.update(() => `${prevcont}<br>=> ${que}`)

  }

  easee = "power1.in-out"
  durtn = 1.2
  secndDurtn = 0.2
  activeIndx = 0;
  prevIndx = 2;
  nxtIndx = 1;

  getID(div: string, indx: number) {
    console.log(`getID: ${div}${indx}`)
    return `${div}${indx}`
  }

  getRightArr(indx: number) {
    return [`box6${indx}`, `box7${indx}`, `box12${indx}`, `box3${indx}`, `box9${indx}`, `box14${indx}`, `box11${indx}`]
  }

  getLeftArr(indx: number) {
    return [`box1${indx}`, `box5${indx}`, `box2${indx}`, `box4${indx}`, `box14${indx}`, `box8${indx}`, `box10${indx}`, `box13${indx}`]
  }

  getbatchesArr(indx: number) {
    return [
      [
        `box1${indx}`,
        `box7${indx}`,
        `box4${indx}`,
        `box3${indx}`,
        `box9${indx}`,
      ],
      [
        `box2${indx}`,
        `box5${indx}`,
        `box8${indx}`,
        `box6${indx}`,
      ],
      [
        `box12${indx}`,
        `box11${indx}`,
        `box14${indx}`,
        `box10${indx}`,
        `box13${indx}`,
      ]
    ]
  }


  playAnimeNxt() {

    if (this.activeIndx === this.contents.length - 1) {
      this.prevIndx = this.contents.length - 1
      this.activeIndx = 0
      this.nxtIndx = this.activeIndx + 1
    } else if (this.nxtIndx === this.contents.length - 1) {
      this.prevIndx = this.activeIndx
      this.activeIndx++
      this.nxtIndx = 0
    } else {
      this.prevIndx = this.activeIndx
      this.activeIndx++
      this.nxtIndx = this.activeIndx + 1
    }

    this.printConsl(` ||--Called Next--||<br>prev: ${this.prevIndx} || actv: ${this.activeIndx} || next: ${this.nxtIndx}`)

    let btDly2 = 0
    for (let frames of this.getbatchesArr(this.prevIndx)) {
      setTimeout(() => {
        let frmDly = 0
        for (let divs of frames) {
          setTimeout(() => {
            if (this.getLeftArr(this.prevIndx).includes(divs)) {
              this.toLeft(divs)
            } else {
              this.toRight(divs)
            }
          }, frmDly)
          frmDly = frmDly + 300
        }
      }, btDly2);
      btDly2 = btDly2 + 400
    }

    setTimeout(() => {
      let btDly1 = 0
      for (let frames of this.getbatchesArr(this.activeIndx)) {
        setTimeout(() => {
          let frmDly = 0
          for (let divs of frames) {
            setTimeout(() => {
              if (this.getLeftArr(this.activeIndx).includes(divs)) {
                this.fromRight(divs)
              } else {
                this.fromLeft(divs)
              }
            }, frmDly)
            frmDly = frmDly + 300
          }
        }, btDly1);
        btDly1 = btDly1 + 400
      }
    }, 500)

  }

  playAnimePrev() {

    if (this.activeIndx === 0) {
      this.activeIndx = this.contents.length - 1
      this.prevIndx = this.activeIndx - 1
      this.nxtIndx = 0
    } else if (this.nxtIndx === 1) {
      this.nxtIndx = this.activeIndx
      this.activeIndx--
      this.prevIndx = this.contents.length - 1
    } else {
      this.nxtIndx = this.activeIndx
      this.activeIndx--
      this.prevIndx = this.activeIndx - 1
    }

    if (this.prevIndx === -1) {
      this.prevIndx = this.contents.length - 1
    }

    this.printConsl(` ||--Called From Prev--||<br>prev: ${this.prevIndx} || actv: ${this.activeIndx} || next: ${this.nxtIndx}`)

    let btDly2 = 0
    for (let frames of this.getbatchesArr(this.nxtIndx).reverse()) {
      setTimeout(() => {
        let frmDly = 0
        for (let divs of frames.reverse()) {
          setTimeout(() => {
            if (this.getRightArr(this.nxtIndx).includes(divs)) {
              this.toLeft(divs)
            } else {
              this.toRight(divs)
            }
          }, frmDly)
          frmDly = frmDly + 300
        }
      }, btDly2);
      btDly2 = btDly2 + 400
    }

    setTimeout(() => {
      let btDly1 = 0
      for (let frames of this.getbatchesArr(this.activeIndx).reverse()) {
        setTimeout(() => {
          let frmDly = 0
          for (let divs of frames.reverse()) {
            setTimeout(() => {
              if (this.getRightArr(this.activeIndx).includes(divs)) {
                this.fromRight(divs)
              } else {
                this.fromLeft(divs)
              }
            }, frmDly)
            frmDly = frmDly + 300
          }
        }, btDly1);
        btDly1 = btDly1 + 400
      }
    }, 300)

  }

  fromLeft(div: string) {
    let tl = gsap.timeline()
    tl.set(`#${div}`, {
      x: -100,
      opacity: 0
    })
    tl.to(`#${div}`, {
      x: 20,
      opacity: 1,
      duration: this.durtn,
      ease: this.easee
    })
    tl.to(`#${div}`, {
      x: 0,
      duration: 0.4,
      opacity: 1,
      ease: this.easee
    })
  }



  fromRight(div: string) {
    let tl = gsap.timeline()
    tl.set(`#${div}`, {
      x: 100,
      opacity: 0
    })
    tl.to(`#${div}`, {
      x: -20,
      opacity: 1,
      duration: this.durtn,
      ease: this.easee
    })
    tl.to(`#${div}`, {
      x: 0,
      duration: 0.4,
      opacity: 1,
      ease: this.easee
    })
  }

  toLeft(div: string) {
    let tl = gsap.timeline()
    tl.to(`#${div}`, {
      x: 20,
      duration: this.secndDurtn,
      opacity: 1,
      ease: this.easee
    })
    tl.to(`#${div}`, {
      x: -100,
      opacity: 0,
      duration: this.durtn,
      ease: this.easee
    })
  }

  toRight(div: string) {
    let tl = gsap.timeline()
    // this.printConsl(`Calling toRight: ID = #${div}`)

    tl.to(`#${div}`, {
      x: -20,
      duration: this.secndDurtn,
      opacity: 1,
      ease: this.easee
    })
    tl.to(`#${div}`, {
      x: 100,
      opacity: 0,
      duration: this.durtn,
      ease: this.easee
    })
  }

}

