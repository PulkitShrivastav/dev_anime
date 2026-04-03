import { Component, inject } from '@angular/core';
import { PopUpService } from '../../AppServices/pop-up-service';
import { NgClass } from "@angular/common";
import { AddButtonComp } from "../addButtonComp/addButtonComp";
import { NewFileComp } from "../new-file-comp/new-file-comp";
import { ErrorComp } from '../error-comp/error-comp';

@Component({
  selector: 'app-popUp',
  imports: [NgClass, ErrorComp, AddButtonComp, NewFileComp,],
  template: `
  
  <div class="fixed top-0 w-full h-[100vh] bg-[black] z-[100] flex items-center justify-center"
    [ngClass]="popUpServ.popUp() ? null : 'hidden' ">
  
    @if(popUpServ.popUpOptions() === 'addButn'){
      <div>
        <app-add-button-comp />
      </div>
    } @else if(popUpServ.popUpOptions() === 'newProject'){
      <div>
        <app-new-file-comp />
      </div>
    } @else if (popUpServ.popUpOptions() === 'error'){
      <div>
        <app-error-comp />
      </div>
    }
      
  
  </div>

  `,
  styles: `
  
  `,
})
export class PopUpComp {

  popUpServ = inject(PopUpService)

}
