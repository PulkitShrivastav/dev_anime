import { Component, inject, effect } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { RiseButton } from '../rise-button/rise-button';

@Component({
  selector: 'app-console-comp',
  imports: [RiseButton],
  template: `
    <div class="mt-1 bg-[#12091a] border-2 border-[#6a7987] w-full rounded-md overflow-hidden">

      <div class="w-full border-b-2 border-[#6a7987] bg-[#2a283d] px-2 py-1 text-[white] quicksand text-sm flex items-center justify-between">
        Console

        <app-rise-button label="Clear" buttonID="consoleButton" (cusClick)="clearConsl()" width="w-[4vw]" padding="p-2" />

      </div>
        
      <div class="p-2">
        <div #scrollingConsole class="h-[33vh] quicksand text-[10px] text-[#ded6b4] log-scroll" [innerHTML]="appSyncServ.printer()"></div>
      </div>

    </div>
  `,
  styles: `

  `,
})
export class ConsoleComp {

  @ViewChild('scrollingConsole') private scrollBox!: ElementRef<HTMLDivElement>;

  appSyncServ = inject(AppSyncService)

  constructor() {
    effect(() => {
      // Track the signal
      this.appSyncServ.printer();

      // Wait for DOM update
      queueMicrotask(() => {
        if (this.scrollBox) {
          const el = this.scrollBox.nativeElement;
          el.scrollTop = el.scrollHeight;
        }
      });
    });
  }

  clearConsl() {
    this.appSyncServ.printer.update(v => v = '')
  }

}
