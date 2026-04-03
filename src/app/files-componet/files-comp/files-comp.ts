import { Component, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { FilesService } from '../../AppServices/files-service';
import { AppIntiateService } from '../../AppServices/app-intiate-service';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonMssgService } from '../../AppServices/common-mssg-service';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-files-comp',
  imports: [NgClass, ReactiveFormsModule],
  template: `
    <div [id]="myFilename()" class="relative quicksand" 
    [ngClass]="appSyncServe.renameMyFiles() && fileServe.focusedButton() === myFilename() ? 'fileDivSelected' : 'fileDiv' "
    (click)="!hoverExternal()  ? this.fileServe.openThisFile(myFilename(), myFileID()) : null"
    (pointerenter)="hoverMe.set(true)"
    (pointerleave)="hoverMe.set(false)">
      <div class="cursor-[url('/icons/pencil.cur'),_auto] w-[100%] border-b-2 border-[#6a7987] flex items-center justify-between p-1">
        <div class="flex items-center"
        [ngClass]="hoverMe() ? 'fill-[#ded6b4]' : null ">
          <div class="p-1">
            <svg viewBox="0 -960 960 960" height='18px'>
              <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
            </svg>
          </div>
          <div class="relative text-[12px] p-1"
          (pointerenter)="checkHover( 'file', 'appear')"
          (pointerleave)="checkHover('file', 'disappear')"
          [ngClass]="hoverMe() && fileServe.focusedButton() !== myFilename() ? 'filenameDiv' : null "
          (click)="appSyncServe.renameMyFiles() && fileServe.focusedButton() === myFilename() ? null : renameMe()">
            <div [ngClass]="appSyncServe.renameMyFiles() && fileServe.focusedButton() === myFilename() ? 'hidden' : null "
            (pointerenter)="hoverExternal.set(true)"
            (pointerleave)="hoverExternal.set(false)">
              {{appSyncServe.formatText(myFilename())}}
            </div>
            <input [ngClass]="appSyncServe.renameMyFiles() && fileServe.focusedButton() === myFilename() ? null : 'hidden' " 
            (blur)="onBlur()" class="bg-[transparent] caret-[#ffb703] w-[19rem] p-1 outline-none" #myInput
            (keydown)="handleKey($event)"
            [formControl]="inputControl" spellcheck="false" type="text">
          </div> 
        </div>
                
        <div class="flex justify-center items-center relative"
        [ngClass]="appSyncServe.renameMyFiles() && fileServe.focusedButton() === this.myFilename() ? 'hidden' : null ">
          <div class="p-2"
          (click)="deleteMe()"
          [ngClass]="hoverMe() ? 'deleteDiv' : 'zeroOpacity'"
          (pointerenter)="checkHover('download', 'appear')"
          (pointerleave)="checkHover('download', 'disappear')">
            <svg viewBox="0 -960 960 960" height='18px'>
              <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
            </svg>
          </div>
          <div class="p-2"
          (click)="deleteMe()"
          [ngClass]="hoverMe() ? 'deleteDiv' : 'zeroOpacity'"
          (pointerenter)="checkHover('trash', 'appear')"
          (pointerleave)="checkHover('trash', 'disappear')">
            <svg viewBox="0 -960 960 960" height='18px'>
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
          </div>
        </div>
      </div>
      <div  [id]="getID('trash')" [class]="mssgClass"
      [ngClass]="appSyncServe.renameMyFiles() && fileServe.focusedButton() === this.myFilename() ? 'hidden' : null ">
        <div class="text-[8px]">
            <span class="quicksand text-[#ded6b4]"
        style="font-weight: 800;">
          Move to Trash.
          </span>
        </div>
      </div>
      <div [id]="getID('file')" [class]="mssgClass"
      [ngClass]="appSyncServe.renameMyFiles() && fileServe.focusedButton() === this.myFilename() ? 'hidden' : null ">
        <div class="text-[8px]">
          <span class="quicksand text-[#ded6b4]"
          style="font-weight: 800;">
            Rename File.
          </span>
        </div>    
      </div>
      <div [id]="getID('download')" [class]="mssgClass"
      [ngClass]="appSyncServe.renameMyFiles() && fileServe.focusedButton() === this.myFilename() ? 'hidden' : null ">
        <div class="text-[8px]">
          <span class="quicksand text-[#ded6b4]"
          style="font-weight: 800;">
            Download HTML File.
          </span>
        </div>
      </div>
      <div [id]="getID('error')" [class]="mssgClass"
      [ngClass]="appSyncServe.renameMyFiles() && fileServe.focusedButton() === this.myFilename() ? null : 'hidden' ">
        <div class="text-[8px]">
          <span class="quicksand text-[#ded6b4]"
          style="font-weight: 800;">
            {{errorMssg()}}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: `
  
  .fileDiv:hover{
    background-color: #261f2c;
    fill: #ded6b4;
    transition: all 0.5s ease-out;
  }

  .fileDivSelected{
    background-color: #261f2c;
    fill: #ded6b4;
    color: #ded6b4;
    font-weight: 800;
    transition: all 0.5s ease-out;
  }

  .fileDiv{
    fill: rgba($color: #ded6b4, $alpha: 0.5);
    color: rgba($color: #ded6b4, $alpha: 0.8);
    background-color: #12091a ease-in;
    transition: all 0.5s;
  }

  .deleteDiv{
    fill: #ded6b4;
    opacity: 1;
    transition: all 0.5s ease-out;
  }

  .zeroOpacity{
    opacity: 0;
    transition: all 0.5s ease-in;
  }

  .deleteDiv:hover{
    fill: #d79fba;
    transition: all 0.5s;
  }

  .filenameDiv{
    color: #ded6b4;
    font-weight: 800;
    transition: all 0.5s ease-out;
  }

  .filenameDiv:hover{
    color: #d79fba;
    transition: all 0.5s;
  }

  `,
})
export class FilesComp {

  constructor(private http: HttpClient) { }
  @ViewChild('myInput') myInput!: ElementRef<HTMLInputElement>

  appSyncServe = inject(AppSyncService)
  appInitServe = inject(AppIntiateService)
  fileServe = inject(FilesService)
  commonMssgServ = inject(CommonMssgService)
  hoverMe = signal(false)
  myFilename = input.required<string>()
  myFileID = input.required<number>()
  mssgClass = 'absolute top-0 w-full flex justify-center opacity-0 cursor-pointer'
  inputControl = new FormControl('')
  hoverExternal = signal(false)
  destroys$ = new Subject<void>()
  errorMssg = signal<string>('')

  getID(ref: string) {
    return `${this.myFilename()}_${ref}`
  }

  deleteMe() {
    this.commonMssgServ.commonMssg.set('This feature is part of our upcoming release.')
    this.commonMssgServ.commonMssgShow()
    setTimeout(() => {
      this.commonMssgServ.commonMssgHide()
    }, 1500)
  }

  onBlur() {
    this.inputControl.setValue(this.appSyncServe.formatText(this.myFilename()))
    this.fileServe.focusedButton.set('')
    this.appSyncServe.renameMyFiles.set(false)
    this.commonMssgServ.commonMssgHide()
    this.hoverExternal.set(false)
  }

  renameMe() {
    this.appSyncServe.renameMyFiles.set(true)
    this.fileServe.focusedButton.set(this.myFilename())
    setTimeout(() => {
      this.myInput.nativeElement.focus()
    }, 10)
    this.commonMssgServ.commonMssg.set('Edit Mode: Press Enter to Submit.')
    this.commonMssgServ.commonMssgShow()
  }

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const projectName = this.inputControl.getRawValue()
      const newFileName = projectName?.toLowerCase().replaceAll(' ', '_') ?? ''
      if (/^\d/.test(newFileName)) {
        this.errorMssg.set("File Name CANNOT Start with an Integer.")
        this.mssgAnime()
        this.inputControl.setValue('')
        this.wrongInputAnime()
      } else {
        this.appSyncServe.setSnackMssg('Please Wait', true)
        this.appSyncServe.showMssg('appear')
        const oldFileName = this.myFilename()
        if (newFileName !== oldFileName && newFileName.length !== 0) {
          const req_obj = {
            fileID: this.myFileID(),
            newName: newFileName,
            oldName: oldFileName
          }
          this.http.put('/api/renamefile', req_obj, { withCredentials: true }).subscribe(data => {
            this.appSyncServe.openedFiles.update(
              v => v.map(f => f.fileID === this.myFileID() ? { ...f, file_name: newFileName } : f)
            )
            this.appSyncServe.allFiles.update(
              v => v.map(f => f.file_id === this.myFileID() ? { ...f, file_name: newFileName } : f)
            )
            const dataFields = ['js', 'css', 'html', 'buttons']
            for (let df of dataFields) {
              const oldData = localStorage.getItem(`${oldFileName}_${df}`) ?? ''
              localStorage.setItem(`${newFileName}_${df}`, oldData)
            }
            let newFile: any
            const openedFiles = this.appSyncServe.openedFiles()
            for (let i of openedFiles) {
              if (i.file_name === newFileName) {
                newFile = i
              }
            }
            this.appSyncServe.activeFile.update(v => v = newFile)
            this.appSyncServe.isSaved.update(v => ({ ...v, [newFileName]: true }))
            setTimeout(() => {
              this.appSyncServe.snackMssgTransition('Rename Successfuly.')
            }, 1000)
          })
        } else {
          this.appSyncServe.setSnackMssg('No Changes Detect!')
          this.appSyncServe.showMssg('appear')
          setTimeout(() => {
            this.appSyncServe.showMssg('disappear')
          }, 1000)
        }
      }
    }
  }

  checkHover(ref: string, state: string) {
    const id = `#${this.myFilename()}_${ref}`
    if (state === 'appear') {
      this.hoverExternal.set(true)
      gsap.to(id, {
        opacity: 1,
        duration: 0.3,
        ease: 'linear'
      })
    } else if (state === 'disappear') {
      this.hoverExternal.set(false)
      gsap.to(id, {
        opacity: 0,
        duration: 0.3,
        ease: 'linear'
      })
    }
  }

  mssgAnime() {
    this.checkHover('error', 'appear')
    setTimeout(() => {
      this.checkHover('error', 'disappear')
    }, 1000)
  }

  wrongInputAnime() {
    const id = `#${this.myFilename()}`
    const tl = gsap.timeline()
    tl.to(id, {
      backgroundColor: '#ff3d08a7',
      duration: 0.2,
      ease: 'linear'
    })
    tl.to(id, {
      backgroundColor: '#261f2c',
      duration: 0.2,
      ease: 'linear',
      onComplete: () => {
        gsap.set(id, {
          clearProps: "backgroundColor"
        })
      }
    })
  }

  ngOnInit() {
    this.inputControl.setValue(this.appSyncServe.formatText(this.myFilename()))
    this.inputControl.valueChanges.pipe(
      takeUntil(this.destroys$),
      distinctUntilChanged()
    ).subscribe(val => {
      const val_length = val?.length
      const usedValue = val?.slice(-1)
      const replace_val = val?.slice(0, val_length ? val_length - 1 : 0)
      if (/[^a-zA-Z0-9 ]/.test(usedValue ?? '')) {
        this.errorMssg.set("Special Characters are NOT ALLOWED.")
        this.mssgAnime()
        this.inputControl.setValue(replace_val ?? '')
        this.wrongInputAnime()
      } else if ((val_length ?? 0) > 30) {
        this.errorMssg.set("File Name CANNOT EXCEED 30 Characters.")
        this.mssgAnime()
        this.wrongInputAnime()
        this.inputControl.setValue(replace_val ?? '')
      }
    })
  }

}
