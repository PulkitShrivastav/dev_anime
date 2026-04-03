import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { FilesService } from '../../AppServices/files-service';
import { NgClass } from '@angular/common';
import { CommonMssgService } from '../../AppServices/common-mssg-service';
import { PopUpService } from '../../AppServices/pop-up-service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-edit-buttons-comp',
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <button [id]="myID()" class="w-[7vw] p-2 text-[14px] quicksand rounded-lg border-2 border-[transparent] block relative"
      style="font-weight: 800;"
      [ngClass]="fileServ.focusedButton() === label() ? 'buttonSelected' : 'buttons' ">
      
      <div (click)="focusThisButton()"
      [ngClass]="fileServ.focusedButton() === label() ? 'hidden' : null ">
        {{appSyncServ.formatText(label())}}
      </div>

      <input #myInput [formControl]="inputControl" spellcheck="false" type="text" 
      class="caret-[#ffb703] w-[6vw] text-center outline-none bg-[transparent] inline-block whitespace-nowrap"
      [ngClass]="fileServ.focusedButton() === label() ? null :'hidden' "
      (keydown)="handleKeyDown($event)"
      (blur)="handleBlur()">
    
    </button>
  `,
  styles: `
  .buttons:hover{
    background-color: #d79fba;
    color: white;
    transition: all 0.5s;
  }

  .buttonSelected{
    background-color: #261f2c;
    color: #ded6b4;
    transition: all 0.3s;
  }

  .buttons{
    background-color: rgba($color: #d79fba, $alpha: 0.7);
    color: rgba($color: #fff, $alpha: 0.5);
    transition: all 0.5s;
  }
  `,
})
export class EditButtonsComp {

  @ViewChild('myInput') inputElem!: ElementRef<HTMLInputElement>

  label = input.required<string>()
  inputControl = new FormControl('')
  appSyncServ = inject(AppSyncService)
  fileServ = inject(FilesService)
  commonMssgServ = inject(CommonMssgService)
  popUpServ = inject(PopUpService)
  destroys$ = new Subject<void>()
  mssgAlive = output<string>()
  myTimer: any | null = null

  focusThisButton() {
    this.fileServ.focusedButton.set(this.label())
    setTimeout(() => { this.inputElem.nativeElement.focus() }, 10)
    this.commonMssgServ.commonMssgHide()
    this.commonMssgServ.commonMssg.set('Edit Mode: Press Enter to Submit.')
    this.commonMssgServ.commonMssgShow()
  }

  myID() {
    return `${this.label()}_input`
  }

  handleBlur() {
    this.fileServ.focusedButton.set('')
    this.commonMssgServ.commonMssg.set('Edit Mode: Click Button to Rename.')
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const newName = this.inputControl.getRawValue()?.toLowerCase().replaceAll(' ', '_') ?? ''
      if (/^\d/.test(newName)) {
        this.mssgAlive.emit("Button Name CANNOT Start With An INTEGER.")
        this.inputControl.setValue('')
        this.wrongInputAnime()
      } else {
        const oldName = this.label()
        const oldButtons = localStorage.getItem(`${this.appSyncServ.activeFile().file_name}_buttons`) ?? ''
        if (oldButtons) {
          if (newName?.length !== 0 && newName !== oldName) {
            let buttons = oldButtons.replace(oldName, newName)
            localStorage.setItem(`${this.appSyncServ.activeFile().file_name}_buttons`, buttons)
            this.popUpServ.getFileButtons()
            this.appSyncServ.editModeOn.set(false)
            this.fileServ.focusedButton.set('')
            this.commonMssgServ.commonMssgHide()
            this.appSyncServ.isSaved.update(v => ({ ...v, [this.appSyncServ.activeFile().file_name]: false }))
          } else {
            this.commonMssgServ.commonMssg.set('Edit Mode: No Changes Detected!')
            setTimeout(() => {
              this.appSyncServ.editModeOn.set(false)
              this.commonMssgServ.commonMssgHide()
            }, 1000)
          }
        }
      }
    }
  }

  wrongInputAnime() {
    const id = `#${this.label()}_input`
    const tl = gsap.timeline({
      repeat: 2,
      onComplete: () => {
        gsap.to(id, {
          borderColor: 'transparent',
          delay: 0.1
        })
      }
    })
    const myDuration = 0.03
    const startPositn = 0
    const endPositn = 100
    tl.to(id, {
      x: (0 - endPositn),
      borderColor: '#ff3d08',
      duration: myDuration,
      ease: 'linear'
    })
    tl.to(id, {
      x: startPositn,
      borderColor: '#ff3d08',
      duration: myDuration,
      ease: 'linear'
    })
    tl.to(id, {
      x: endPositn,
      borderColor: '#ff3d08',
      duration: myDuration,
      ease: 'linear'
    })
    tl.to(id, {
      x: startPositn,
      borderColor: '#ff3d08',
      duration: myDuration,
      ease: 'linear'
    })
  }

  ngOnInit() {
    this.inputControl.valueChanges.pipe(
      takeUntil(this.destroys$),
      distinctUntilChanged()
    ).subscribe(val => {
      const val_lentgh = val?.length
      const usedValue = val?.slice(-1)
      const replace_val = val?.slice(0, val_lentgh ? val_lentgh - 1 : 0)

      if (usedValue === ' ') {
        this.mssgAlive.emit("Button Name Should be a SINGLE WORD.")
        this.inputControl.setValue(replace_val ?? '')
        this.wrongInputAnime()
      } else if (/[^a-zA-Z0-9]/.test(usedValue ?? '')) {
        this.mssgAlive.emit("Special Characters Are NOT ALLOWED.")
        this.inputControl.setValue(replace_val ?? '')
        this.wrongInputAnime()
      } else if ((val_lentgh ?? 0) > 10) {
        this.mssgAlive.emit("Button Name CANNOT EXCEED 10 Characters.")
        this.inputControl.setValue(replace_val ?? '')
        this.wrongInputAnime()
      }
    })
  }

  ngAfterViewInit() {
    this.inputControl.setValue(this.appSyncServ.formatText(this.label()))
  }

}
