import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { AppSyncService } from '../../AppServices/app-sync-service';

@Component({
  selector: 'app-user-insert-grid',
  imports: [NgClass],
  template: `
    <div class="h-[91%]"
      [ngClass]="appSyncServ.selectedControl() === 'insert' ? null : 'hidden'">
        <button class="p-2 text-[white] border-2 border-[white] m-4 rounded-lg text-[10px]">
          This feature is part of our upcoming release.
        </button>
    </div>
  `,
  styles: ``,
})
export class UserInsertGrid {

  appSyncServ = inject(AppSyncService)

}
