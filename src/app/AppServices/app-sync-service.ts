import { Injectable, signal } from '@angular/core';
import { AllFiles, IsSaved } from '../Services/models';
import { ElementRef } from '@angular/core';
import { MyUsers } from '../Services/models';
import { FileNames } from '../Services/models';
import { gsap } from 'gsap/gsap-core';

@Injectable({
  providedIn: 'root',
})
export class AppSyncService {

  openedFiles = signal<AllFiles[]>([])
  isFileRouteActive = signal<boolean>(false)
  isSaved = signal<IsSaved>({})
  printer = signal<string>('>> Check Console Printer Readings Here...')
  scrollbox: ElementRef | null = null
  fileControlIdentifires = ['control', 'insert']
  selectedControl = signal(this.fileControlIdentifires[0])
  didDivChange = signal(true)
  isSelected = signal('anime')
  snackContent = signal('')
  checkLoader = signal(false)
  allFiles = signal<FileNames[]>([])
  editModeOn = signal(false)
  renameMyFiles = signal(false)
  newFile = {
    created: false,
    myName: ''
  }

  activeFile = signal<AllFiles>({
    fileID: 0,
    file_name: 'string',
    html_code: 'string',
    js_code: 'string',
    css_code: 'string',
    buttons: 'Array<string>'
  })

  checkSaved(name: string) {
    return this.isSaved()[name]
  }

  printConsl(que: string) {
    let prevcont = this.printer();
    if (this.printer() === '') {
      this.printer.update(() => `${prevcont}>> ${que}`)
    } else {
      this.printer.update(() => `${prevcont}<br>>> ${que}`)
    }
  }

  setScrollbox(scroller: ElementRef) {
    this.scrollbox = scroller
  }

  formatText(name: string, file: boolean = false) {
    const newName = name.replaceAll('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
    if (file) {
      let formatedName
      newName.length > 12 ? formatedName = newName.slice(0, 12) + ' . . .' : formatedName = newName
      return formatedName
    } else {
      return newName
    }
  }

  updateActvFile(myFileName: string) {
    this.openedFiles().forEach((file) => {
      if (file.file_name === myFileName) {
        this.activeFile.set(file)
      }
    })
  }

  showMssg(state: 'appear' | 'disappear') {
    let tl = gsap.timeline()
    if (state === 'appear') {
      tl.to('#snackMssg', { duration: 1, y: 0, opacity: 1, ease: "elastic.out" })
    }
    if (state === 'disappear') {
      tl.to('#snackMssg', { duration: 0.8, y: -20, delay: 0.5, opacity: 0, ease: "elastic.in" })
    }
  }

  setSnackMssg(mssg: string, loader: boolean = false) {
    if (loader) {
      this.checkLoader.set(true)
      this.snackContent.set(mssg)
    } else {
      this.snackContent.set(mssg)
      this.checkLoader.set(false)
    }
  }

  snackMssgTransition(mssg: string, loader: boolean = false) {
    if (loader) {
      this.checkLoader.set(true)
    } else {
      gsap.to('snackLoader', {
        duration: 0.3, opacity: 0, ease: "power1.out", onComplete: () => {
          this.checkLoader.set(false)
        }
      })
    }
    gsap.to('#snackContent', {
      duration: 0.3, opacity: 0, ease: "power1.out", onComplete: () => {
        this.snackContent.set(mssg)
        gsap.to('#snackContent', {
          duration: 0.3, opacity: 1, ease: "power1.in", onComplete: () => {
            this.showMssg('disappear')
          }
        })
      }
    })
  }

}
