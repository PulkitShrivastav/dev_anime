import { Component, inject, output, signal } from '@angular/core';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { NgClass } from '@angular/common';
import { RiseButton } from '../rise-button/rise-button';
import { gsap } from 'gsap/gsap-core';
import { PopUpService } from '../../AppServices/pop-up-service';
import { EditButtonsComp } from '../edit-buttons-comp/edit-buttons-comp';
import { CommonMssgService } from '../../AppServices/common-mssg-service';
import { FilesService } from '../../AppServices/files-service';

@Component({
  selector: 'app-user-control-button-comp',
  imports: [NgClass, RiseButton, EditButtonsComp],
  template: `
    <div class="h-[91%]"
    [ngClass]="appSyncServ.selectedControl() === 'control' ? null : 'hidden'">
      <div class="flex justify-end gap-1 pr-2">
        <div id="editMssgDiv" class="w-full opacity-0 quicksand text-[8px] text-[#ded6b4] font-extrabold flex items-center justify-center">
          <span class="">{{myMssg()}}</span>
        </div>
        <div class="fill-[#12091a] editButn p-1 my-2 font-extrabold w-fit rounded-md relative">
          <div class="absolute top-0 left-0 w-full h-full z-[10]"
          (pointerenter)="appSyncServ.editModeOn() ? null : enterDiv('add')"
          (pointerleave)="appSyncServ.editModeOn() ? null : leaveDiv()"
          (click)="appSyncServ.editModeOn() ? errorOnEditMode() : newButton()"></div>
          <svg viewBox="0 -960 960 960" class="h-[12px] widht-[12px]">
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
          </svg>
        </div>
        <div class="fill-[#12091a] p-1 my-2 font-extrabold w-fit rounded-md relative"
        [ngClass]="appSyncServ.editModeOn() ? 'editButnSelected' : 'editButn' ">
          <div class="absolute top-0 left-0 w-full h-full z-[10]"
          (pointerenter)="appSyncServ.editModeOn() ? null : enterDiv('edit')"
          (pointerleave)="appSyncServ.editModeOn() ? null : leaveDiv()"
          (click)="editButton()"></div>
          <svg viewBox="0 -960 960 960" class="h-[12px] w-[12px]">
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
          </svg>
        </div>
      </div>
      <div class="grid grid-cols-2 p-1 gap-2 items-center justify-items-center">
        @for ( button of popUpServ.fileButtons(); track $index){
          @if (appSyncServ.editModeOn()){
            <div>
              <app-edit-buttons-comp [label]="button" (mssgAlive)="showErrorMssg($event)" />
            </div>
          } @else {
            <app-rise-button [label]="appSyncServ.formatText(button)", [buttonID]="button" 
            [width]="'w-[7vw]'" [padding]="'p-2'" (cusClick)="emitterButton(button)" />
          }
        }
    </div>
  `,
  styles: `
  .editButn:hover{
    background-color: #ded6b4;
    transition: all 0.3s;
  }

  .editButnSelected{
    background-color: #d79fba;
    fill: white;
    transition: all 0.3s;
  }

  .editButn{
    background-color: rgba($color: #ded6b4, $alpha: 0.7);
    transition: all 0.3s;
  }
  `,
})
export class UserControlButtonComp {

  appSyncServ = inject(AppSyncService)
  popUpServ = inject(PopUpService)
  commonMsgServ = inject(CommonMssgService)
  fileServ = inject(FilesService)
  controlClicked = output<string>()
  myMssg = signal<string>('')

  onHoverAdd(state: string) {
    if (state === 'enter') {
      gsap.to('#addButton', {
        scale: 1.2,
        duration: 0.1,
        ease: 'linear'
      })
    } else if (state === 'leave') {
      gsap.to('#addButton', {
        scale: 1,
        duration: 0.1,
        ease: 'linear'
      })
    }
  }

  emitterButton(controlName: string) {
    this.controlClicked.emit(controlName)
  }

  newButton() {
    this.popUpServ.openPopUp('addButn')
  }

  editButton() {
    if (this.appSyncServ.editModeOn()) {
      this.appSyncServ.editModeOn.set(false)
      this.fileServ.focusedButton.set('')
      this.commonMsgServ.commonMssgHide()
    } else {
      this.appSyncServ.editModeOn.set(true)
      this.commonMsgServ.commonMssg.set('Edit Mode: Click Button to Rename.')
      this.commonMsgServ.commonMssgShow()
      this.leaveDiv()
    }
  }

  errorOnEditMode() {
    this.appSyncServ.setSnackMssg('Edit mode On: Action Canceled.')
    this.appSyncServ.showMssg('appear')
    setTimeout(() => {
      this.appSyncServ.showMssg('disappear')
    }, 500)
  }

  showErrorMssg(mssg: string) {
    this.myMssg.set(mssg)
    this.enterDiv('')
    setTimeout(() => {
      this.leaveDiv()
    }, 1000)
  }

  enterDiv(ref: string) {
    switch (ref) {
      case 'add': this.myMssg.set('Add New Button.'); break
      case 'edit': this.myMssg.set('Rename Buttons.'); break
    }
    const id = '#editMssgDiv'
    gsap.to(id, {
      opacity: 1,
      duration: 0.8,
      ease: 'power1.out'
    })
  }

  leaveDiv() {
    const id = '#editMssgDiv'
    gsap.to(id, {
      opacity: 0,
      duration: 0.8,
      ease: 'power1.in'
    })
  }

}