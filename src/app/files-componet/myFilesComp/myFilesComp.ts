import { Component, inject, output, signal } from '@angular/core';
import { FilesComp } from '../files-comp/files-comp';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { AppIntiateService } from '../../AppServices/app-intiate-service';
import { NgClass } from "@angular/common";
import { PopUpService } from '../../AppServices/pop-up-service';
import { FeatureButtonRef } from '../../AppModels/appModels';
import { CommonMssgService } from '../../AppServices/common-mssg-service';

@Component({
  selector: 'app-my-files',
  imports: [FilesComp, NgClass],
  template: `

  <div class="w-full rounded-xl p-1">
      <div class="w-full flex items-cneter justify-center gap-1 my-2">
        @for(butn of buttons; track $index){
          <div class="w-[23%] py-1 px-2 quicksand whitespace-nowrap text-center text-[10px] border-2 features"
          (click)="onClick(butn.ref)"
          [ngClass]="checkMyIndx($index)">{{butn.label}}</div>
        }
      </div>
      <div class="w-full h-full border-2 border-[#6a7987] overflow-hidden col-span-5 row-span-4 rounded-md">
          <div class="josefin bg-[#2a283d] text-[white] text-[14px] p-2 border-b-2 border-b-[#6a7987]">
            My Files.
          </div>
          <div class="w-full h-[35vh] bg-[#12091a] log-scroll">
            @for (file of appSyncServ.allFiles(); track $index){
              <app-files-comp [myFilename]="file.file_name" [myFileID]="file.file_id"/>
            }
          </div>
      </div>
  </div>


  `,
  styles: `
  .features:hover{
    border-color: white;
    color: white;
    background-color: #d79fba;
    transition: all 0.6s;
  }

  .features{
    border-color: rgba($color: #fff, $alpha: 0.5);
    color: rgba($color: #fff, $alpha: 0.7);
    background-color: rgba($color: #d79fba, $alpha: 0.8);
    transition: all 0.6s;
  }

  `,
})
export class MyFilesComp {

  constructor(
    private route: Router,
    private sanitizer: DomSanitizer,
  ) { }

  appSyncServ = inject(AppSyncService)
  appInitServe = inject(AppIntiateService)
  popUpServe = inject(PopUpService)
  clicked = output<string>()
  selected = signal<number>(0)
  commonMssgServ = inject(CommonMssgService)



  safeSvg(svg: string) {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  buttons: FeatureButtonRef[] = [
    {
      label: 'My Files',
      ref: 'file',
      svg: `<path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>`
    },
    {
      label: 'New File',
      ref: 'project',
      svg: `<path d="M160-80v-80h640v80H160Zm200-160v-280H200l280-360 280 360H600v280H360Zm80-80h80v-280h76L480-750 364-600h76v280Zm40-280Z"/>`
    },
    {
      label: 'Uploads',
      ref: 'upload',
      svg: `<path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>`
    },
    {
      label: 'Cheat Sheet',
      ref: 'sheet',
      svg: `<path d="M160-80v-80h640v80H160Zm320-160L200-600h160v-280h240v280h160L480-240Zm0-130 116-150h-76v-280h-80v280h-76l116 150Zm0-150Z"/>`
    },
  ]

  checkMyIndx(indx: number) {
    const length = this.buttons.length
    if (indx === 0) {
      return 'rounded-l-full'
    } else if (indx === length - 1) {
      return 'rounded-r-full'
    } else {
      return ''
    }
  }

  onClick(ref: FeatureButtonRef['ref']) {
    switch (ref) {
      case 'project': this.popUpServe.openPopUp('newProject'); break
      case 'upload':
        this.commonMssgServ.commonMssg.set('This feature is part of our upcoming release.')
        this.commonMssgServ.commonMssgShow()
        setTimeout(() => {
          this.commonMssgServ.commonMssgHide()
        }, 1500); break
      case 'sheet':
        this.commonMssgServ.commonMssg.set('This feature is part of our upcoming release.')
        this.commonMssgServ.commonMssgShow()
        setTimeout(() => {
          this.commonMssgServ.commonMssgHide()
        }, 1500); break
    }
  }

  ngOnInit() {

  }








}
