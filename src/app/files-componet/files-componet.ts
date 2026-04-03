import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyFilesComp } from "./myFilesComp/myFilesComp";
import { AppIntiateService } from '../AppServices/app-intiate-service';
import { AppSyncService } from '../AppServices/app-sync-service';
import { FilesService } from '../AppServices/files-service';
import { NgClass } from "@angular/common";
import { PopUpComp } from './popUpComp/popUpComp';
import { NavFileTab } from './nav-file-tab/nav-file-tab';
import { ConsoleComp } from './console-comp/console-comp';
import { PopUpService } from '../AppServices/pop-up-service';

@Component({
  selector: 'app-files-componet',
  imports: [MyFilesComp, NavFileTab, RouterOutlet, NgClass, PopUpComp, ConsoleComp],
  template: `

    <app-popUp  />
    @if (appInitServ.isLoaded()) {
      <div class="m-2 grid grid-cols-12 gap-2 items-center justify-items-center h-[90vh]"
        [ngClass]="popUpServ.popUp() ? 'blur-[15px]' : null ">
        
        <!-- Grid-Column-1 -->
        <div class="w-full h-full col-span-9 row-span-4" >

          <div class="flex h-[35px]">
            @for ( file of appSyncServ.openedFiles(); track $index){
              <app-nav-file-tab [myFilename]="file.file_name" />
            }
          </div>

          <router-outlet />

        </div>
        
        <!-- Grid-Column-2 -->
        <div class="w-full h-full col-span-3 row-span-4" >

          <app-my-files />

          <app-console-comp />

        </div>

      </div>
    }

  `,
  styles: `

  `,
})
export class FilesComponet {

  appSyncServ = inject(AppSyncService)
  appInitServ = inject(AppIntiateService)
  fileServ = inject(FilesService)
  popUpServ = inject(PopUpService)

  ngOnInit() {
    this.appInitServ.InitiateWebApp()
    this.appSyncServ.isFileRouteActive.set(true)
  }

}
