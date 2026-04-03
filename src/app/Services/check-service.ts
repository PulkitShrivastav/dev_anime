import { inject, Injectable, signal } from '@angular/core';
import { gsap } from 'gsap';
import { Openfiles } from './openfiles';

@Injectable({
  providedIn: 'root',
})
export class CheckService {

  openedfiles = inject(Openfiles)

}
