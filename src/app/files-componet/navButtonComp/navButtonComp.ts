import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-nav-buttons',
  imports: [],
  template: `
    <button class="w-[8vw] rounded-lg p-2 btn text-[white]" (click)="handleClicks($event)">
        {{title()}}
    </button>
  `,
  styles: `
  
  .btn:hover{
    background-color: #aca9bb;
    color: #2a2a2a;
    transition: background-color 0.3s;
  }

  `,
})
export class NavButtonComp {

  title = input.required<string>()

  buttonClick = output<MouseEvent>()

  handleClicks(event: MouseEvent) {
    this.buttonClick.emit(event)
  }

}
