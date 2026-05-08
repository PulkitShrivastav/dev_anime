import { Component, inject } from '@angular/core';
import { CommonMssgService } from '../../AppServices/common-mssg-service';
import { Loader } from "../loader/loader";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-common-mssg-bar',
  imports: [Loader, NgClass],
  template: `
    <div id="commonMssgBar" class="w-full fixed z-[2000] flex justify-center">
      <div class=" p-1">
      <div class="flex items-center justify-center gap-1 text-[#12091a] bg-[#ded6b4] josefin w-fit border-2 border-[#a67805] py-2 px-4 rounded-lg">
        <p id="commonMssgText">{{this.commonMssgServ.commonMssg()}}</p>
        <span id="commonMssgLoader" [ngClass]="commonMssgServ.loader() ? null : 'hidden' "><app-loader /></span>
      </div>
    </div>
    </div>
  `,
  styles: ``,
})
export class CommonMssgBar {

  commonMssgServ = inject(CommonMssgService)

}
