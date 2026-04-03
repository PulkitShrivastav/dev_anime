import { Component, inject, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { FilesService } from '../../AppServices/files-service';
import { gsap } from 'gsap/gsap-core';
import { HttpClient } from '@angular/common/http';
import { CommonMssgService } from '../../AppServices/common-mssg-service';

@Component({
  selector: 'app-nav-file-tab',
  imports: [NgClass, RouterLink],
  template: `
    <div style="width: 150px;" [routerLink]="hoverExternal() ? null : ['/files', myFilename()]"
      class="cursor-pointer relative rounded-t-md p-1 mr-[2px]" 
      (pointerover)="hoverDiv.set(true)"
      (pointerout)="hoverDiv.set(false)"
      [ngClass]="actvTab() ? 'onActive' : 'toSelect border-b-2 border-[#181534aa]'">
      <div class="w-full flex justify-center">
        <div class="w-[4rem] h-[2px] mb-1 rounded-full" [ngClass]="appSyncServ.checkSaved(myFilename()) ? null : onSelected()">
        </div>
      </div>
      <div style="white-space: nowrap; overflow: hidden;"
          class="quicksand text-[12px] text-center w-[90%]">
            {{this.appSyncServ.formatText(myFilename(), true)}}
      </div>
      <div 
      (pointerenter)="hoverExternal.set(true)"
      (pointerleave)="hoverExternal.set(false)"
      class="absolute top-0 right-0 m-1" [ngClass]="actvTab() ? 'closeButton' : 'hoverClose'"
      (click)="closeThisFile()">
        <svg height="10px" viewBox="0 -960 960 960">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      </div>
    </div>
  `,
  styles: `
  
  .hoverClose{
    fill: white;
  }

  .closeButton{
    fill: white;
  }

  .closeButton:hover{
    fill: #d79fba;
    transition: fill 0.3s;
  }

  .hoverClose:hover{
    fill: #2a283d;
    transition: fill 0.3s;
  }

  .toSelect{
    background-color: #181534aa;
    color: #ffffffa3;
    transition: all 0.3s;
  }

  .toSelect:hover{
    background-color: #927da2;
    color: #2a283d;
    border-color: #927da2;
    transition: all 0.3s;
  }

  .selected{
    background-color: #927da2;
    transition: background-color 0.3s;
  }

  .selectedHover{
    background-color: #2a283d;
    transition: background-color 0.3s;
  }

  .onActive{
    background-color: #2a283d;
    color: white;
    border-bottom: 2px solid #d79fba;
    transition: all 0.3s;
  }
  
  `,
})
export class NavFileTab {

  constructor(private http: HttpClient) { }

  hoverDiv = signal<boolean>(false)
  isActvTab = signal<boolean>(false)
  fileServ = inject(FilesService)
  appSyncServ = inject(AppSyncService)
  myFilename = input.required<string>()
  hoverExternal = signal(false)
  commonMssgServ = inject(CommonMssgService)

  actvTab() {
    if (this.appSyncServ.activeFile() === null) {
      return false
    } else if (this.appSyncServ.activeFile().file_name === this.myFilename()) {
      return true
    } else {
      return false
    }
  }

  closeThisFile() {
    const files = this.appSyncServ.openedFiles()
    if (files.length === 1) {
      this.commonMssgServ.commonMssg.set('Cannot Close This File.')
      this.commonMssgServ.commonMssgShow()
      setTimeout(() => {
        this.commonMssgServ.commonMssgHide()
      }, 1500)
    } else if (!this.appSyncServ.isSaved()[this.myFilename()]) {
      this.commonMssgServ.commonMssg.set(`Please Save Changes Before Closing.`)
      this.commonMssgServ.commonMssgShow()
      setTimeout(() => {
        this.commonMssgServ.commonMssgHide()
      }, 1500)
    }
    else {
      let queue = ''
      const fileToClose = this.myFilename()
      let newFileArray = []
      for (let file of files) {
        if (file.file_name !== fileToClose) {
          queue = queue + file.file_name + '|'
          newFileArray.push(file)
        }
      }
      if (fileToClose === this.appSyncServ.activeFile().file_name) {
        for (let [index, file] of this.appSyncServ.openedFiles().entries()) {
          if (file.file_name === this.myFilename()) {
            if (this.appSyncServ.openedFiles()[index + 1]) {
              const newActiveFile = this.appSyncServ.openedFiles()[index + 1]
              this.appSyncServ.activeFile.set(newActiveFile)
            } else {
              const newActiveFile = this.appSyncServ.openedFiles()[index - 1]
              this.appSyncServ.activeFile.set(newActiveFile)
            }
            break
          }
        }
      }
      const que_len = queue.length
      queue = queue.slice(0, que_len - 1)
      this.appSyncServ.openedFiles.set(newFileArray)
      this.http.put<Record<string, string>>('/api/closefile', {
        openFiles: queue
      }, { withCredentials: true }).subscribe(data => {
      })
    }
  }

  onSelected() {
    if (this.myFilename() === this.appSyncServ.activeFile().file_name) {
      return 'selected'
    } else {
      if (this.hoverDiv()) {
        return 'selectedHover'
      } else {
        return 'selected'
      }
    }
  }

}
