import { Component, inject, ViewChild, ElementRef, signal, output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { gsap } from 'gsap';
import { NgClass } from "@angular/common";
import { AnimeComponent } from '../anime-component/anime-component';
import { FileControlComp } from '../file-control-comp/file-control-comp';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { UserControlButtonComp } from '../user-control-button-comp/user-control-button-comp';
import { UserInsertGrid } from "../user-insert-grid/user-insert-grid";
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { AppIntiateService } from '../../AppServices/app-intiate-service';
import { FilesService } from '../../AppServices/files-service';
import { TextEditorComp } from '../text-editor-comp/text-editor-comp';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from '../../AppServices/pop-up-service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-code-component',
  imports: [NgClass, UserControlButtonComp, AnimeComponent, FileControlComp, UserInsertGrid, TextEditorComp],
  template: `
    <div id="docDiv" class="relative bg-[#2a283d] h-[86vh] w-full p-2 rounded-r-md rounded-b-md overflow-hidden">
      <div class="h-full w-full ">
        <div class="grid grid-cols-12 gap-2 justfy-items-between h-full">
          
          <!-- Document Div -->
          <div id="fileDiv" class="relative h-full min-w-0 rounded-lg overflow-hidden border-2 border-[#6a7987] col-span-9">
            
            <!-- Anime Div -->
             <div class="h-full w-full bg-[#12091a]"
                   [ngClass]="textComp.isCode() ? 'hidden' : 'opacity-1'">
              <app-anime-component #codeComp />
             </div>

            <!-- Save Message Div -->
             <div id="saveMssg"
                  [ngClass]="textComp.isCode() ? 'opacity-1' : 'hidden'"
                  class="quicksand cursor-pointer bg-[#d79fba]/70 text-[10px] text-[white]/70 w-fit rounded-lg px-3 py-2 z-[9] absolute top-4 right-4"
                  (pointerenter)="onEnter()"
                  (pointerleave)="onLeave()"
                  (click)="runCode()">
              <span id="textMssg" class="inline-block">Save & Run</span>
             </div>

            <!-- Editor Div -->
            <app-text-editor-comp #textComp />

          </div>
          
          <!-- Control Buttons Div -->
          <div class="h-full col-span-3">

            <!-- mssesage div -->
             <div class="flex justify-end h-[30px]">
              <div id="snackMssg" class="flex items-center justify-center gap-2 text-[white] text-[8px] quicksand mt-1 px-2 py-1 border-2 rounded-lg text-center w-[50%]">
                
                <div id="snackContent" [innerHTML]="appSyncServ.snackContent()"></div>
                <div class="loader w-[20px]" [ngClass]="appSyncServ.checkLoader() ? null : 'hidden' "></div>
                
              </div>
             </div>
            
            <!-- Nav Button Div -->
            <div class="flex justify-between w-full mt-4 cursor-pointer">
              @for(butn of navButns; track $index){
                <div (click)="switchDivs(fileName, butn, textComp.editor_models[butn === 'js' ? 'javascript' : butn])"
                      style="font-weight: 800;"
                      class="quicksand hoverButton w-full h-fit text-center text-[white] text-[10px] p-1"
                      [ngClass]="getNavClass($index, butn)">
                  @if(butn === 'js'){
                    javascript
                  } @else {
                    {{butn}}
                  }
                </div>
              }
            </div>
              
            <!-- File Controls Logic UI -->
             <div class="rounded-lg h-[82%] overflow-hidden mt-4 border-2 border-[#6a7987] bg-[#12091a]">
              
              <div class="w-full cursor-pointer grid grid-cols-2 border-b-2 border-[#6a7987]">
                <!-- Control Buttons -->
                <app-file-control-comp
                  myName="Control Buttons" 
                  myIdentifier="control" 
                  borderClass="border-r-2 border-[#6a7987]" /> 
                  <!-- Insert Grids -->
                <app-file-control-comp
                  myName="Insert Grids"
                  myIdentifier="insert"
                  borderClass="" /> 
              </div>

              <!-- Control Buttons -->
              <app-user-control-button-comp #userButtonControl (controlClicked)="trigger($event)"/>

              <!-- Insert Grid -->
              <app-user-insert-grid />

             </div>
          </div>
        
        </div>
      </div>
    </div>

  `,
  styles: `
  
  .hoverButton:hover{
    background-color: #927da2;
    color: #2a283d;
    transition: all 0.3s;
  }

  .selectedButton{
    background-color: #927da2;
    color: #2a283d;
  }
  
  `,
})
export class CodeComponent {

  @ViewChild('codeComp') codeComp!: AnimeComponent
  @ViewChild('textComp') textComp!: TextEditorComp
  @ViewChild('userButtonControl') userButtonComp!: UserControlButtonComp
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) { }

  appSyncServ = inject(AppSyncService)
  popUpServ = inject(PopUpService)
  appInitServ = inject(AppIntiateService)
  fileServ = inject(FilesService)
  cameFromRun = false
  fileChange$ = new ReplaySubject<string>()
  fileName = ''
  didJustLand = true
  click = true
  navButns = ['anime', 'html', 'css', 'js']
  saveTimer: any = null

  clicked() {
    if (this.click) {
      this.appSyncServ.setSnackMssg('Saving', true)
      this.appSyncServ.showMssg('appear')
      this.click = false
    } else {
      this.appSyncServ.showMssg('disappear')
      this.click = true
    }
  }

  runCode() {
    this.appSyncServ.setSnackMssg('Saving', true)
    this.appSyncServ.showMssg('appear')
    let action = ''
    if (this.appSyncServ.newFile.created && this.appSyncServ.newFile.myName === this.fileName) {
      action = 'save'
    } else {
      action = 'update'
    }
    this.http.put<Record<string, string>>('/api/savefile', {
      fileName: this.fileName,
      js_code: localStorage.getItem(`${this.fileName}_js`),
      css_code: localStorage.getItem(`${this.fileName}_css`),
      html_code: localStorage.getItem(`${this.fileName}_html`),
      buttons: localStorage.getItem(`${this.fileName}_buttons`) ? localStorage.getItem(`${this.fileName}_buttons`) : '',
      action: action
    }, {
      withCredentials: true
    }).subscribe(data => {
      setTimeout(() => {
        this.codeComp.getCode()
      }, 10)
      this.textComp.isCode.set(false)
      this.appSyncServ.isSaved()[this.fileName] = true
      this.appSyncServ.isSelected.set('anime')
      this.cameFromRun = true
      setTimeout(() => {
        this.appSyncServ.snackMssgTransition('Saved Successfully.')
      }, 1000)
    })
  }

  trigger(mssg: string) {
    mssg = mssg.toLowerCase()
    this.codeComp.triggerIframe(mssg)
  }

  getNavClass(indx: number, div: string) {
    if (indx === 0) {
      if (div === this.appSyncServ.isSelected()) {
        return 'border-l-2 border-y-2 rounded-l-md border-[#6a7987] selectedButton'
      } else {
        return 'border-l-2 border-y-2 rounded-l-md border-[#6a7987]'
      }
    } else if (indx === this.navButns.length - 1) {
      if (div === this.appSyncServ.isSelected()) {
        return 'border-2 rounded-r-md border-[#6a7987] selectedButton'
      } else {
        return 'border-2 rounded-r-md border-[#6a7987]'
      }
    } else {
      if (div === this.appSyncServ.isSelected()) {
        return 'border-y-2 border-l-2 border-[#6a7987] selectedButton'
      } else {
        return 'border-y-2 border-l-2 border-[#6a7987]'
      }
    }
  }

  switchDivs(fileName: string, keyname: string, editModel: any = null) {
    if (this.didJustLand) {
      this.didJustLand = false
    } else {
      if (this.cameFromRun) {
        this.cameFromRun = false
      } else {
        this.appSyncServ.didDivChange.update(v => v = true)
      }
    }
    this.appSyncServ.isSelected.set(keyname)
    if (this.appSyncServ.isSelected() !== 'anime') {
      this.textComp.loadCode(fileName, this.appSyncServ.isSelected(), editModel)
      this.textComp.isCode.set(true)
    } else {
      this.textComp.isCode.set(false)
    }
  }

  onEnter() {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer)
    }
    this.saveTimer = setTimeout(() => {
      gsap.to('#saveMssg', { duration: 0.3, y: -5, backgroundColor: '#d79fba', ease: "power1.in" })
      gsap.to('#textMssg', { duration: 0.3, y: -3, color: 'white', ease: 'power1.in' })
    }, 100)
  }

  onLeave() {
    clearTimeout(this.saveTimer)
    gsap.to('#saveMssg', { duration: 0.3, backgroundColor: 'rgba(215, 159, 186, 0.7)', y: 0, ease: "power1.in" })
    gsap.to('#textMssg', { duration: 0.3, y: 0, color: 'rgba(255, 255, 255, 0.7)', ease: "power1.in" })
  }

  ngOnInit() {
    gsap.set('#snackMssg', { y: -30, opacity: 0 })
    this.route.paramMap.pipe(takeUntil(this.fileServ.destroys$)).subscribe(params => {
      this.appSyncServ.didDivChange.update(v => v = true)
      this.fileName = `${params.get('fileName')}`
      this.appSyncServ.updateActvFile(this.fileName)
      this.fileChange$.next(this.fileName)
      setTimeout(() => {
        this.codeComp.getCode()
      }, 10)
    })
  }

  ngAfterViewInit() {
    this.fileChange$.pipe(takeUntil(this.fileServ.destroys$)).subscribe(file => {
      this.textComp.onFileChange()
      this.popUpServ.getFileButtons()
    })
  }

}