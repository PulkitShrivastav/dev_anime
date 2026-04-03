import { Component } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-loader',
  imports: [],
  template: `
    <div class="w-fit h-fit p-2 flex items-center justify-center gap-2">
      <div id="box-1" class="w-[4px] h-[4px] bg-[black] rounded-full"></div>
      <div id="box-2" class="w-[4px] h-[4px] bg-[black] rounded-full"></div>
      <div id="box-3" class="w-[4px] h-[4px] bg-[black] rounded-full"></div>
      <div id="box-4" class="w-[4px] h-[4px] bg-[black] rounded-full"></div>
    </div>
  `,
  styles: ``,
})
export class Loader {



  ngAfterViewInit() {
    const tl = gsap.timeline()
    const animeParams = {
      DURATION: 0.2,
      Y_TRAVEL: -10,
      EASE: 'linear'
    }
    setInterval(() => {
      tl.to('#box-1', {
        y: animeParams.Y_TRAVEL,
        duration: animeParams.DURATION,
        ease: animeParams.EASE,
        onComplete: () => {
          gsap.to('#box-1', {
            y: 0,
            duration: animeParams.DURATION,
            ease: animeParams.EASE
          })
        }
      })
      tl.to('#box-2', {
        y: animeParams.Y_TRAVEL,
        duration: animeParams.DURATION,
        ease: animeParams.EASE,
        onComplete: () => {
          gsap.to('#box-2', {
            y: 0,
            duration: animeParams.DURATION,
            ease: animeParams.EASE
          })
        }
      })
      tl.to('#box-3', {
        y: animeParams.Y_TRAVEL,
        duration: animeParams.DURATION,
        ease: animeParams.EASE,
        onComplete: () => {
          gsap.to('#box-3', {
            y: 0,
            duration: animeParams.DURATION,
            ease: animeParams.EASE
          })
        }
      })
      tl.to('#box-4', {
        y: animeParams.Y_TRAVEL,
        duration: animeParams.DURATION,
        ease: animeParams.EASE,
        onComplete: () => {
          gsap.to('#box-4', {
            y: 0,
            duration: animeParams.DURATION,
            ease: animeParams.EASE
          })
        }
      })
    }, animeParams.DURATION)
  }

}
