import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-buttons-to',
  imports: [RouterLinkWithHref],
  template: `
  
  <button routerLink="carousel"  class="josefin bg-slate-500 p-2 text-[white] w-fit text-center rounded-xl">
    Carousel Anime
  </button>
  
  <button routerLink="ganpati" class="josefin bg-slate-500 p-2 text-[white] w-fit text-center rounded-xl">
    Ganpati Anime
  </button>

  `,
  styleUrl: './buttons-to.scss',
})
export class ButtonsTo {

}
