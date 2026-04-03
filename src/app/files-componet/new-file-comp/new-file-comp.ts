import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { NgClass } from '@angular/common';
import { gsap } from 'gsap/gsap-core';
import { RiseButton } from '../rise-button/rise-button';
import { PopUpService } from '../../AppServices/pop-up-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { Router } from '@angular/router';
import { AppIntiateService } from '../../AppServices/app-intiate-service';
import { HttpClient } from '@angular/common/http';
import { AllFiles } from '../../Services/models';

@Component({
  selector: 'app-new-file-comp',
  imports: [NgClass, RiseButton, ReactiveFormsModule],
  template: `
    <div class="w-[50vw] h-[25vh] rounded-lg">
      <div class="relative p-4 quicksand rounded-t-lg text-[14px] text-[white] bg-[#2a283d] border-2 border-[#6a7987]">
        New Project.
        <div id="close" class="rounded-md absolute top-1 right-1"
            (click)="close()">
          <svg class="h-[20px]" viewBox="0 -960 960 960">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        </div>
      </div>

      <div class="text-[#ded6b4] text-[10px] p-2 bg-[#12091a] border-x-2 border-[#6a7987] font-extrabold quicksand">
        <div id="mssgDiv" class="text-center">
          {{this.popUpServ.myMssg()}}
        </div>
      </div>
      
      <div class="p-4 flex justify-center items-center bg-[#12091a] cursor-text  border-x-2 border-[#6a7987]"
        (click)="popUpServ.focusInputElem(buttonName)">
        <div id="inputDiv" class="flex items-center justify-center w-fit gap-4 px-4 py-2 rounded-xl border-2 border-transparent"
          [ngClass]="popUpServ.checkFocus('name')">
          <div id="name" class="josefin text-[14px] text-[#ded6b4]">New Project Name:</div>
          <input (keydown)="handleKey($event)" type="text" #buttonName [formControl]='inputControl'
          class="bg-[#12091a] caret-[#ffb703] text-[#f7716a] text-[14px] josefin focus:outline-none"
          [ngClass]="popUpServ.is_focused() ? 'bg-[#261f2c]' : 'bg-[#12091a]' "
          (focus)="popUpServ.is_focused.set(true)"
          (blur)="popUpServ.is_focused.set(false)">
        </div>
      </div>
      
      <div class="pb-4 bg-[#12091a] border-x-2 border-[#6a7987] border-b-2 flex justify-center rounded-b-lg">
        <app-rise-button label="Submit" buttonID="submit" [width]="'w-[10vw]'" [padding]="'p-2'" (cusClick)="submit()" />
      </div>
    </div>
  `,
  styles: `
  #close:hover {
    fill: white;
    transition: all 0.3s;
  }

  #close {
    fill: #6a7987;
    transition: all 0.3s;
  }
  `,
})
export class NewFileComp {

  constructor(
    private route: Router,
    private http: HttpClient
  ) { }

  @ViewChild('buttonName') buttonName !: ElementRef<HTMLInputElement>

  popUpServ = inject(PopUpService)
  focusedOnce = false
  inputControl = new FormControl('')
  destroys$ = new Subject<void>()
  appSyncServ = inject(AppSyncService)
  appInitServ = inject(AppIntiateService)

  mssgAnime() {
    let tl = gsap.timeline()
    tl.to('#mssgDiv', {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'elastic.out'
    })
    tl.to('#mssgDiv', {
      y: -20,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'elastic.inOut'
    })
  }

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submit()
    }
  }

  wrongInputAnime() {
    const id = '#inputDiv'
    const tl = gsap.timeline({
      repeat: 2,
      onComplete: () => {
        gsap.to(id, {
          borderColor: 'transparent',
          delay: 0.1
        })
      }
    })
    const myDuration = 0.03
    const startPositn = 0
    const endPositn = 5
    tl.to(id, {
      x: (0 - endPositn),
      borderColor: '#ff3d08',
      duration: myDuration,
      ease: 'linear'
    })
    tl.to(id, {
      x: startPositn,
      borderColor: '#ff3d08',
      duration: myDuration,
      ease: 'linear'
    })
    tl.to(id, {
      x: endPositn,
      borderColor: '#ff3d08',
      duration: myDuration,
      ease: 'linear'
    })
    tl.to(id, {
      x: startPositn,
      borderColor: '#ff3d08',
      duration: myDuration,
      ease: 'linear'
    })
  }

  close() {
    this.popUpServ.closePopUp()
    this.focusedOnce = false
    this.inputControl.setValue('')
  }

  submit() {
    const projectName = this.inputControl.getRawValue()
    let newName = projectName?.toLowerCase().replaceAll(' ', '_') ?? ''
    this.http.get<AllFiles[]>('api/newfile', { withCredentials: true }).subscribe(data => {
      console.log(data)
      let dataOBJ = {
        file_name: newName,
        js_code: data[0].js_code,
        css_code: data[0].css_code,
        html_code: data[0].html_code,
        buttons: data[0].buttons,
        action: 'save'
      }
      console.log(dataOBJ)
      this.http.put<AllFiles[]>('api/savefile', dataOBJ, { withCredentials: true }).subscribe(data => {
        console.log(data)
        const newFile: AllFiles = {
          fileID: data[0].fileID,
          file_name: newName,
          js_code: data[0].js_code,
          css_code: data[0].css_code,
          html_code: data[0].html_code,
          buttons: data[0].buttons
        }
        this.appSyncServ.openedFiles.update(v => v = [...v, newFile])
        this.appSyncServ.allFiles.update(v => v = [...v, {
          file_id: data[0].fileID,
          file_name: `${newName}`
        }])
        this.appInitServ.setFilesInMemory()
        this.route.navigate(['/files', newName])
        this.appSyncServ.setSnackMssg('New Project Create.')
        this.appSyncServ.showMssg('appear')
        this.appSyncServ.showMssg('disappear')
        this.inputControl.setValue('')
        this.popUpServ.closePopUp()
        this.focusedOnce = false
        this.appSyncServ.isSaved.update(v => ({ ...v, [newName]: true }))
      })
    })
  }

  ngOnInit() {

    gsap.set('#mssgDiv', {
      y: -20,
      opacity: 0,
    })

    this.inputControl.valueChanges.pipe(
      takeUntil(this.destroys$),
      distinctUntilChanged()
    ).subscribe(val => {
      const val_length = val?.length
      const usedValue = val?.slice(-1)
      const replace_val = val?.slice(0, val_length ? val_length - 1 : 0)
      if (/[^a-zA-Z0-9 ]/.test(usedValue ?? '')) {
        this.popUpServ.myMssg.set("Special Characters are NOT ALLOWED.")
        this.mssgAnime()
        this.inputControl.setValue(replace_val ?? '')
        this.wrongInputAnime()
      } else if ((val_length ?? 0) > 30) {
        this.popUpServ.myMssg.set("File Name CANNOT EXCEED 30 Characters.")
        this.mssgAnime()
        this.wrongInputAnime()
        this.inputControl.setValue(replace_val ?? '')
      }
    })

  }

  ngAfterViewChecked() {
    if (!this.focusedOnce) {
      this.popUpServ.focusInputElem(this.buttonName.nativeElement)
      this.focusedOnce = true
    }
  }

  ngOnDestroy() {
    this.destroys$.next()
    this.destroys$.complete()
  }
}
