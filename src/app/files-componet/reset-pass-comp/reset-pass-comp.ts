import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonMssgService } from '../../AppServices/common-mssg-service';
import gsap from 'gsap';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-reset-pass-comp',
  imports: [NgClass, ReactiveFormsModule],
  template: `
    <div class="relative w-[40vw] h-[50vh] border-2 border-[#474554] rounded-lg overflow-hidden quicksand" [formGroup]="passwordForm">
      <div class="bg-[#474554] text-[white] text-[16px] font-medium p-4">
        Please Provide Your New Password.
      </div>
      <div class="flex flex-col items-center mt-8">
        <div class="w-[80%]">
          <div class="flex justify-between">
            <div #passLabel class="cursor-default py-1 px-2 text-[10px] bg-[#474554] rounded-t-lg w-fit quicksand
            font-bold text-[white]">
              New Password
          </div>
          <div class="mr-2 svgSelected" [ngClass]="reactiveElems.passVisible() ? null : 'hidden' "
          (click)="passHide()">
            <svg class="w-[1.5rem]" viewBox="0 -960 960 960">
              <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/>
            </svg>
          </div>
          <div class="mr-2 svg" [ngClass]="reactiveElems.passVisible() ? 'hidden' : null "
          (click)="passShow()">
            <svg class="w-[1.5rem]" viewBox="0 -960 960 960" >
              <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
            </svg>
          </div>
        </div>
        <input #passInput type="password" class="josefin p-2 w-full outline-none selection:bg-[#aca9bb] selection:text-[white] bg-[#aca9bb]/30 
          rounded-tr-lg rounded-bl-lg text-[16px] h-[2rem] border-2 border-[#474554] caret-[#ff9d69] text-[#ff9d69]"
          formControlName="password" spellcheck="false" autocomplete="off"
          (focus)="passDivFocus()"
          (blur)="passDivsOnBlur('password')">
        <div class="cursor-default flex justify-between items-center">
          <div #passMssg class="text-[10px] font-bold ml-2"
            [style.color]="reactiveElems.messageColor.password()">{{reactiveElems.message.password()}}</div>
            <div #passChars class="py-1 px-2 text-[10px] flex flex-col items-center bg-[#474554] w-fit text-center rounded-b-lg w-fit quicksand font-bold text-[white]">
              <div>{{reactiveElems.chars()}}/15</div>
              <div class="rounded-full my-1 ml-2 overflow-hidden"
              [ngClass]="reactiveElems.isPassFocused() ? 'actvFocus' : 'dactvFocus' ">
                <div #STRENGTH_BAR style="transform-origin: 0% 0%;"
                class="w-[5rem] h-[3px] rounded-full"></div>
              </div>
            </div>
        </div>
        </div>
      <div class="w-[80%] mb-4">
          <div #confPassLabel class="cursor-default py-1 px-2 text-[10px] bg-[#474554] rounded-t-lg w-fit quicksand
          font-bold text-[white]">
            Confirm Password
          </div>
          <input #confPassInput type="password" class="josefin p-2 w-full outline-none selection:bg-[#aca9bb] selection:text-[white] bg-[#aca9bb]/30 
            rounded-tr-lg rounded-b-lg text-[16px] h-[2rem] border-2 border-[#474554] caret-[#ff9d69] text-[#ff9d69]"
            formControlName="confirm_password" spellcheck="false" autocomplete="off"
            (focus)="confPassFocus()"
            (blur)="passDivsOnBlur('confirm_password')">
          <div class="cursor-default flex justify-between items-center">
              <div #confPassMssg class="text-[10px] font-bold ml-2"
              [style.color]="reactiveElems.messageColor.confirm_password()">{{reactiveElems.message.confirm_password()}}</div>
          </div>
      </div>
      </div>

      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 mb-8">
        <button id="login" [ngClass]="checksToSubmit() ? 'actvbutton' : 'deactvbutton cursor-default' " 
        (pointerenter)="checksToSubmit() ? pointEnter('login') : null" 
        (pointerleave)="checksToSubmit() ? pointLeave('login') : null"
        (click)="checksToSubmit() ? submit() : null">
          <span class="block" id="login_text">Submit.</span>
        </button>
      </div>
    </div>
  `,
  styles: `
  .actvbutton{
      background-color: rgba($color: #aca9bb, $alpha: 0.6);
      border-radius: 0.5rem;
      padding: 0.5rem;
      width: 10rem;
      color: #474554;
      font-weight: 600;
      transition: all 0.5s;
    }

  .actvFocus{
    border: 2px solid rgba($color: #474554, $alpha: 0.5);
    background-color: rgba($color: #474554, $alpha: 0.5);
    transition: all 0.5s;
  }

  .dactvFocus{
    border: 2px solid rgba($color: #f8e0db, $alpha: 0.3);
    background-color: rgba($color: #f8e0db, $alpha: 0.5);
    transition: all 0.5s;
  }

  .deactvbutton{
      background-color: rgba($color: #706c6c, $alpha: 0.6);
      border-radius: 0.5rem;
      padding: 0.5rem;
      width: 10rem;
      color: #ffffff80;
      font-weight: 600;
      transition: all 0.5s;
    }

  .actvbutton:hover{
      background-color: #ff9d69;
      color: white;
      transition: all 0.5s;
    }

  .svg{
      fill: #474554;
      transition: all 0.5s;
    }

  .svg:hover{
      fill: #ff9d69;
      transition: all 0.5s;
    }
    
  .svgSelected{
      fill: #ff9d69;
      transition: all 0.5s;
    }
  `,
})
export class ResetPassComp {

  @ViewChild('passLabel') passLabel!: ElementRef<HTMLDivElement>
  @ViewChild('passInput') passInput!: ElementRef<HTMLInputElement>
  @ViewChild('passChars') passChars!: ElementRef<HTMLDivElement>
  @ViewChild('passMssg') passMssg!: ElementRef<HTMLDivElement>
  @ViewChild('STRENGTH_BAR') STRENGTH_BAR!: ElementRef<HTMLDivElement>
  @ViewChild('confPassLabel') confPassLabel!: ElementRef<HTMLDivElement>
  @ViewChild('confPassInput') confPassInput!: ElementRef<HTMLInputElement>
  @ViewChild('confPassMssg') confPassMssg!: ElementRef<HTMLDivElement>

  destroy$ = new Subject()

  passwordForm: FormGroup
  constructor(private frmBuldr: FormBuilder) {
    this.passwordForm = this.frmBuldr.group({
      password: [''],
      confirm_password: ['']
    })

    this.inputControls = {
      password: this.passwordForm.get('password'),
      confirm_password: this.passwordForm.get('confirm_password')
    }
  }

  htmlELEMS!: Record<ELEMS, HTMLDivElement | HTMLInputElement>
  inputControls!: Record<'password' | 'confirm_password', any>

  reactiveElems = {
    isPassFocused: signal(false),
    chars: signal(0),
    message: {
      password: signal(''),
      confirm_password: signal('')
    },
    messageColor: {
      password: signal(''),
      confirm_password: signal('')
    },
    passVisible: signal(false),
    validPass: signal(false),
    validConfPass: signal(false)
  }

  commonMssgServ = inject(CommonMssgService)

  submit() {
    this.commonMssgServ.commonMssg.set('You Have Finally Clicked Submit!!')
    this.commonMssgServ.commonMssgShow()
    setTimeout(() => {
      this.commonMssgServ.commonMssgHide()
    }, 1500)
  }

  passHide() {
    this.passInput.nativeElement.type = 'password'
    this.reactiveElems.passVisible.set(false)
  }

  passShow() {
    this.passInput.nativeElement.type = 'text'
    this.reactiveElems.passVisible.set(true)
  }

  pointEnter(id: string) {
    gsap.to(`#${id}`, {
      y: -10,
      duration: 0.3,
      ease: 'linear'
    })
    gsap.to(`#${id}_text`, {
      y: -5,
      duration: 0.3,
      delay: 0.2,
      ease: 'linear'
    })
  }

  pointLeave(id: string) {
    gsap.to(`#${id}`, {
      y: 0,
      duration: 0.3,
      ease: 'linear'
    })
    gsap.to(`#${id}_text`, {
      y: 0,
      duration: 0.3,
      delay: 0.2,
      ease: 'linear'
    })
  }

  checksToSubmit() {
    if (this.reactiveElems.validPass() && this.reactiveElems.validConfPass()) {
      return true
    } else {
      return false
    }
  }

  passDivFocus() {
    this.validPassChars(this.inputControls.password?.value)
    this.reactiveElems.isPassFocused.set(true)
    gsap.to(this.htmlELEMS.passMssg, {
      opacity: 1,
      duration: 0.5,
      ease: 'linear'
    })
  }

  confPassFocus() {
    const val = this.inputControls.confirm_password?.value
    if (val === '') {
      this.reactiveElems.message.confirm_password.set('')
      gsap.to(this.htmlELEMS.confPassMssg, {
        opacity: 1,
        duration: 0.5,
        ease: 'linear'
      })
    }
  }

  setPassValidation(points: number) {
    const red = '#FF3B3B'
    const orange = '#FF8A00'
    const yellow = '#FFD400'
    const green = '#22FF66'
    const success = '#a8c3a3'
    const warning = '#ffb1a3'
    const error = '#c44f68'
    let color = ''
    let backColor = ''
    if (points <= 4) {
      color = red
      backColor = error
      this.reactiveElems.messageColor.password.set(error)
      this.reactiveElems.validPass.set(false)
    } else if (points > 4 && points <= 6) {
      color = orange
      backColor = warning
      this.reactiveElems.messageColor.password.set(warning)
      this.reactiveElems.validPass.set(false)
    } else if (points > 6 && points <= 8) {
      color = yellow
      backColor = warning
      this.reactiveElems.messageColor.password.set(warning)
      this.reactiveElems.validPass.set(false)
    } else if (points > 8) {
      color = green
      backColor = success
      this.reactiveElems.messageColor.password.set(success)
      this.reactiveElems.validPass.set(true)
      this.reactiveElems.message.password.set('Valid Password Approved.')
    }
    const scale = 0.1 * points
    const animeParams = {
      COLOR: color,
      BACK_COLOR: backColor,
      DURATION: 0.5,
      EASE: 'linear',
      SCALE: scale
    }
    gsap.to(this.htmlELEMS.passLabel, {
      backgroundColor: animeParams.BACK_COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
    gsap.to(this.htmlELEMS.passInput, {
      borderColor: animeParams.BACK_COLOR,
      duration: animeParams.DURATION,
      color: animeParams.BACK_COLOR,
      ease: animeParams.EASE
    })
    gsap.to(this.htmlELEMS.passChars, {
      backgroundColor: animeParams.BACK_COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
    gsap.to(this.htmlELEMS.STRENGTH_BAR, {
      scaleX: animeParams.SCALE,
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
  }

  validConfirmPass(state: 'success' | 'error') {
    let color = ''
    switch (state) {
      case 'success': color = '#a8c3a3'; this.reactiveElems.validConfPass.set(true); break
      case 'error': color = '#c44f68'; this.reactiveElems.validConfPass.set(false); break
    }
    const animeParams = {
      COLOR: color,
      DURATION: 0.5,
      EASE: 'linear'
    }
    this.reactiveElems.messageColor.confirm_password.set(color)
    gsap.to(this.htmlELEMS.confPassLabel, {
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
    gsap.to(this.htmlELEMS.confPassInput, {
      borderColor: animeParams.COLOR,
      color: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
  }

  passDivsOnBlur(id: 'password' | 'confirm_password') {
    const val = this.inputControls[id]?.value
    if (val === '') {
      let _ID: 'pass' | 'confPass'
      switch (id) {
        case 'password': _ID = 'pass'; break
        case 'confirm_password': _ID = 'confPass'; break
      }
      const controls = {
        LABEL: this.htmlELEMS[`${_ID}Label`],
        INPUT: this.htmlELEMS[`${_ID}Input`],
        MSSG: this.htmlELEMS[`${_ID}Mssg`]
      }
      const animeParams = {
        COLOR: '#474554',
        DURATION: 0.5,
        EASE: 'linear'
      }
      gsap.to(controls.LABEL, {
        backgroundColor: animeParams.COLOR,
        duration: animeParams.DURATION,
        ease: animeParams.EASE,
      })
      if (id === 'password') {
        this.reactiveElems.isPassFocused.set(false)
        gsap.to(this.htmlELEMS.passChars, {
          backgroundColor: animeParams.COLOR,
          duration: animeParams.DURATION,
          ease: animeParams.EASE,
        })
      }
      gsap.to(controls.INPUT, {
        borderColor: animeParams.COLOR,
        duration: animeParams.DURATION,
        ease: animeParams.EASE,
      })
      gsap.to(controls.MSSG, {
        opacity: 0,
        duration: animeParams.DURATION,
        ease: animeParams.EASE
      })
    }
  }

  validPassChars(val: string) {
    const validations = {
      length: val.length < 12 ? false : true,
      spcSym: /[^\w]/.test(val),
      uppercase: /[A-Z]/.test(val),
      lowercase: /[a-z]/.test(val),
      number: /[0-9]/.test(val)
    }
    const used_val = val.slice(-1)
    let points = 0
    if (validations.length) {
      points += 2
    }
    if (validations.spcSym) {
      points += 2
    }
    if (validations.uppercase) {
      points += 2
    }
    if (validations.lowercase) {
      points += 2
    }
    if (validations.number) {
      points += 2
    }
    if (!validations.length) {
      this.reactiveElems.message.password.set('Minimum 12 Characters are REQUIRED.')
    } else if (!validations.lowercase) {
      this.reactiveElems.message.password.set('Minimum 1 Lowercase Letter is REQUIRED.')
    } else if (!validations.uppercase) {
      this.reactiveElems.message.password.set('Minimum 1 Uppercase Letter is REQUIRED.')
    } else if (!validations.number) {
      this.reactiveElems.message.password.set('Minimum 1 Number is REQUIRED.')
    } else if (!validations.spcSym) {
      this.reactiveElems.message.password.set('Minimum 1 Special Charcter is REQUIRED.')
    }
    this.setPassValidation(points)
  }

  checkConfPass(val: string) {
    const pass = this.inputControls.password?.value
    if (pass === '' || pass !== val) {
      this.reactiveElems.message.confirm_password.set('Password DO NOT Match.')
      this.validConfirmPass('error')
    } else {
      this.reactiveElems.message.confirm_password.set('Password MATCHES.')
      this.validConfirmPass('success')
    }
  }

  ngOnInit() {
    this.inputControls.password?.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()).subscribe((val: string) => {
        const val_len = val.length
        if (val_len > 15) {
          const rep_val = val.slice(0, val_len - 1)
          this.inputControls.password?.setValue(rep_val)
        } else {
          const confPassValue = this.inputControls.confirm_password?.value
          if (confPassValue !== '') {
            this.checkConfPass(confPassValue)
          }
          this.reactiveElems.chars.set(val.length)
          this.validPassChars(val)
        }
      })

    this.inputControls.confirm_password?.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()).subscribe((val: string) => {
        this.checkConfPass(val)
      })
  }

  ngAfterViewInit() {
    this.htmlELEMS = {
      passLabel: this.passLabel.nativeElement,
      passInput: this.passInput.nativeElement,
      passChars: this.passChars.nativeElement,
      passMssg: this.passMssg.nativeElement,
      STRENGTH_BAR: this.STRENGTH_BAR.nativeElement,
      confPassLabel: this.confPassLabel.nativeElement,
      confPassInput: this.confPassInput.nativeElement,
      confPassMssg: this.confPassMssg.nativeElement
    }
  }

}

type ELEMS = 'passLabel' | 'passInput' | 'passChars' | 'passMssg' | 'STRENGTH_BAR' | 'confPassLabel' | 'confPassInput' | 'confPassMssg'