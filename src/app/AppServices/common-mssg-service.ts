import { Injectable, signal } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class CommonMssgService {

  commonMssg = signal<string>('')
  loader = signal(false)

  commonMssgShow() {
    gsap.to('#commonMssgBar', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'elastic.out'
    })
  }

  commonMssgHide() {
    gsap.to('#commonMssgBar', {
      y: -100,
      opacity: 0,
      duration: 0.1,
      ease: 'power1.in'
    })
  }

  popMessage(message: string, loader: boolean = false,) {
    this.commonMssg.set(message)
    this.loader.set(loader)
    this.commonMssgShow()
  }

  popMessageTransform(message: string, loader: 'on' | 'off' | 'remain' = 'remain') {
    const loader_ID = '#commonMssgLoader'
    const mssg_ID = '#commonMssgText'
    if (loader === 'on') {
      this.loader.set(true)
      gsap.to(loader_ID, {
        opacity: 1,
        duration: 0.5,
        delay: 0.01,
        ease: 'power1.out'
      })
    } else if (loader === 'off') {
      gsap.to(loader_ID, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.out',
        onComplete: () => {
          gsap.set(loader_ID, {
            opacity: 1,
          })
          this.loader.set(false)
        }
      })
    }
    gsap.timeline().to(mssg_ID, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.in',
      onComplete: () => {
        this.commonMssg.set(message)
      }
    }).to(mssg_ID, {
      opacity: 1,
      duration: 0.5,
      delay: 0.01,
      ease: 'power1.in'
    })
  }

}
