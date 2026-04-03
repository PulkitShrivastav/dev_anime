import { signal, Injectable, ElementRef, inject } from '@angular/core';
import { gsap } from 'gsap';
import { AppSyncService } from './app-sync-service';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {

  popUp = signal<boolean>(false)
  popUpOptions = signal<OPTIONS>('')
  is_focused = signal(false)
  myMssg = signal<string>('myMssgDiv is Working as intended.')
  isWrngInputAnimeOn = signal(false)
  appSyncServ = inject(AppSyncService)
  fileButtons = signal<Array<string>>([])

  focusInputElem(element: HTMLInputElement) {
    element.focus()
  }

  myFocus(divID: string) {
    gsap.to(`#${divID}`, {
      scale: 1.1,
      duration: 0.2,
    })
  }

  myBlur(divID: string) {
    gsap.to(`#${divID}`, {
      scale: 1,
      duration: 0.2,
    })
  }

  checkFocus(divID: string) {
    if (this.is_focused()) {
      this.myFocus(divID)
      return 'bg-[#261f2c]'
    } else {
      this.myBlur(divID)
      return 'bg-[#12091a]'
    }
  }

  openPopUp(option: OPTIONS) {
    this.popUp.set(true)
    this.popUpOptions.set(option)
    console.log('PopUp Triggered')
  }

  closePopUp() {
    this.popUp.set(false)
  }

  getFileButtons() {
    let buttons = localStorage.getItem(`${this.appSyncServ.activeFile().file_name}_buttons`) ?? ''
    let newButtons = buttons === '' ? [] : buttons?.split('|')
    if (newButtons) {
      this.fileButtons.set(newButtons)
    }
  }

}
type OPTIONS = 'addButn' | 'newProject' | 'error' | 'load' | ''