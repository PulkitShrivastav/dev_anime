import { Component, ElementRef, inject, signal, output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, distinctUntilChanged, first } from 'rxjs';
import gsap from 'gsap';
import { NgClass } from "@angular/common";
import { CommonMssgService } from '../../AppServices/common-mssg-service';
import { HttpClient } from '@angular/common/http';
import { UserServices } from '../../AppServices/user-services';
import { PopUpService } from '../../AppServices/pop-up-service';

@Component({
  selector: 'app-sing-up-comp',
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div class="w-[45rem] oerflow-hidden border-2 border-[#2a2a2a] font-bold rounded-lg">
      <div class="bg-[#474554] text-[white] text-[14px] p-4 font-medium quicksand">Sign Up.</div>
      <div class="h-[50vh]" [formGroup]="signUpForm">
        <div class="grid grid-cols-2 items-center justify-items-center m-4 gap-4">
          <div class="w-full">
            <div id="first_label" class="cursor-default py-1 px-2 text-[10px] bg-[#474554] rounded-t-lg w-fit quicksand
            font-bold text-[white]">First Name
            </div>
            <input id="first_input" type="text" class="josefin p-2 w-full outline-none selection:bg-[#aca9bb] selection:text-[white] bg-[#aca9bb]/30 
            rounded-tr-lg rounded-bl-lg text-[16px] h-[2rem] border-2 border-[#474554] caret-[#ff9d69] text-[#ff9d69]"
            formControlName="firstName" spellcheck="false" autocomplete="off">
            <div class="cursor-default flex justify-between items-center">
              <div id="first_error" class="text-[10px] ml-2"
              [style.color]="mssgColor.firstname()">{{errorMssg.firstname()}}</div>
              <div id="first_chars" class="py-1 px-2 text-[10px] bg-[#474554] w-[8rem] text-center rounded-b-lg w-fit quicksand font-bold text-[white]">
                Characters: {{chars.firstname()}}/30
              </div>
            </div>
          </div>

          <div class="w-full">
            <div id="last_label" class="cursor-default py-1 px-2 text-[10px] bg-[#474554] rounded-t-lg w-fit quicksand
            font-bold text-[white]">Last Name
            </div>
            <input id="last_input" type="text" class="josefin p-2 w-full outline-none selection:bg-[#aca9bb] selection:text-[white] bg-[#aca9bb]/30 
            rounded-tr-lg rounded-bl-lg text-[16px] h-[2rem] border-2 border-[#474554] caret-[#ff9d69] text-[#ff9d69]"
            formControlName="lastName" spellcheck="false" autocomplete="off">
            <div class="cursor-default flex justify-between ml-2 items-center">
              <div id="last_error" class="text-[10px] text-[#ff3d08]">{{errorMssg.lastname()}}</div>
              <div id="last_chars" class="py-1 px-2 text-[10px] bg-[#474554] text-center w-[8rem] rounded-b-lg w-fit quicksand font-bold text-[white]">
                Characters: {{chars.lastname()}}/30
              </div>
            </div>
          </div>
        </div>

        <div class="w-full px-4">
          <div id="email_label" class="cursor-default py-1 px-2 text-[10px] bg-[#474554] rounded-t-lg w-fit quicksand
          font-bold text-[white]">
            Email Address
          </div>
          <input id="email_input" type="text" class="josefin p-2 w-full outline-none selection:bg-[#aca9bb] selection:text-[white] bg-[#aca9bb]/30 
            rounded-tr-lg rounded-bl-lg text-[16px] h-[2rem] border-2 border-[#474554] caret-[#ff9d69] text-[#ff9d69]"
            (blur)="validateEmail()"
            formControlName="emailAdd" spellcheck="false" autocomplete="off">
          <div class="cursor-default flex justify-between items-center">
              <div id="email_error" class="text-[10px] ml-2"
              [style.color]="mssgColor.email()">{{errorMssg.email()}}</div>
              <div id="email_chars" class="py-1 px-2 text-[10px] bg-[#474554] w-[8rem] text-center rounded-b-lg w-fit quicksand font-bold text-[white]">
                Characters: {{chars.email()}}/150
              </div>
          </div>
        </div>

        <div class="grid grid-cols-2 m-4 gap-4">
          <div class="w-full">
            <div class="flex items-center justify-between">
              <div id="password_label" class="cursor-default py-1 px-2 text-[10px] bg-[#474554] rounded-t-lg w-fit quicksand
              font-bold text-[white]">
                Password
              </div>
              <div class="mr-2 svgSelected" [ngClass]="passVisible() ? null : 'hidden' "
              (click)="passHide()">
                <svg class="w-[1.5rem]" viewBox="0 -960 960 960">
                  <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/>
                </svg>
              </div>
              <div class="mr-2 svg" [ngClass]="passVisible() ? 'hidden' : null "
              (click)="passShow()">
                <svg class="w-[1.5rem]" viewBox="0 -960 960 960" >
                  <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
                </svg>
              </div>
            </div>
            <input id="password_input" #passInput type="password" class="josefin p-2 w-full outline-none selection:bg-[#aca9bb] selection:text-[white] bg-[#aca9bb]/30 
              rounded-tr-lg rounded-bl-lg text-[16px] h-[2rem] border-2 border-[#474554] caret-[#ff9d69] text-[#ff9d69]"
              formControlName="password" spellcheck="false" autocomplete="off"
              (focus)="passDivFocus()"
              (blur)="passDivsOnBlur('password')">
            <div class="cursor-default flex justify-between items-center">
                <div id="password_error" class="text-[10px] ml-2"
                [style.color]="mssgColor.pass()">{{errorMssg.pass()}}</div>
                <div id="password_chars" class="py-1 px-2 text-[10px] flex flex-col items-center bg-[#474554] w-fit text-center rounded-b-lg w-fit quicksand font-bold text-[white]">
                  <div>{{chars.pass()}}/15</div>
                  <div class="rounded-full my-1 ml-2 overflow-hidden"
                  [ngClass]="isPassFocused() ? 'actvFocus' : 'dactvFocus' ">
                    <div id="passBar" style="transform-origin: 0% 0%;"
                    class="w-[5rem] h-[3px] rounded-full"></div>
                  </div>
                </div>
            </div>
          </div>

          <div class="w-full">
            <div id="confirmPass_label" class="cursor-default py-1 px-2 text-[10px] bg-[#474554] rounded-t-lg w-fit quicksand
            font-bold text-[white]">
              Confirm Password
            </div>
            <input id="confirmPass_input" type="password" class="josefin p-2 w-full outline-none selection:bg-[#aca9bb] selection:text-[white] bg-[#aca9bb]/30 
              rounded-tr-lg rounded-b-lg text-[16px] h-[2rem] border-2 border-[#474554] caret-[#ff9d69] text-[#ff9d69]"
              formControlName="confirmPass" spellcheck="false" autocomplete="off"
              (focus)="confPassFocus()"
              (blur)="passDivsOnBlur('confirmPass')">
            <div class="cursor-default flex justify-between items-center">
                <div id="confirmPass_error" class="text-[10px] ml-2"
                [style.color]="mssgColor.confPass()">{{errorMssg.confPass()}}</div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-4">
          <button id="login" [ngClass]="checksToSubmit() ? 'actvbutton' : 'deactvbutton cursor-default' " 
          (pointerenter)="checksToSubmit() ? pointEnter('login') : null" 
          (pointerleave)="checksToSubmit() ? pointLeave('login') : null"
          (click)="checksToSubmit() ? submit() : null">
            <span class="block" id="login_text">Submit.</span>
          </button>
        </div>

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
export class SingUpComp {

  @ViewChild('passInput') passInput!: ElementRef<HTMLInputElement>

  signUpForm: FormGroup
  destroy$ = new Subject()
  passwordPoints = 0
  passVisible = signal(false)
  isPassFocused = signal(false)
  commonMssgServ = inject(CommonMssgService)
  userServ = inject(UserServices)
  verify = output()
  popServ = inject(PopUpService)

  constructor(
    private frmBuldr: FormBuilder,
    private http: HttpClient) {
    this.signUpForm = this.frmBuldr.group({
      firstName: [''],
      lastName: [''],
      emailAdd: [''],
      password: [''],
      confirmPass: ['']
    })
  }

  chars = {
    lastname: signal(0),
    firstname: signal(0),
    email: signal(0),
    pass: signal(0)
  }

  errorMssg = {
    firstname: signal(''),
    lastname: signal(''),
    email: signal(''),
    pass: signal(''),
    confPass: signal('')
  }

  mssgColor = {
    firstname: signal(''),
    lastname: signal(''),
    email: signal(''),
    pass: signal(''),
    confPass: signal('')
  }

  validPass = signal(false)
  validConfPass = signal(false)

  checkIfFilled(values: VAL) {
    const list: Array<keyof typeof values> = ['firstname', 'lastname', 'email_address', 'password']
    let filled = true
    for (let entry of list) {
      if (values[entry] === '') {
        filled = false
      }
    }
    return filled
  }

  submit() {
    const values: VAL = {
      firstname: this.signUpForm.get('firstName')?.value ?? '',
      lastname: this.signUpForm.get('lastName')?.value ?? '',
      email_address: this.signUpForm.get('emailAdd')?.value ?? '',
      password: this.signUpForm.get('password')?.value ?? ''
    }
    if (this.checkIfFilled(values)) {
      this.verify.emit()
      this.commonMssgServ.popMessage('Please Wait.', true)
      this.userServ.user_login_details.email_address = values.email_address
      this.userServ.user_login_details.firstname = values.firstname
      this.userServ.user_login_details.lastname = values.lastname
      this.userServ.user_login_details.myPass = values.password
      this.http.put<Record<'guest_id', number>>('/api/user/send_otp', {
        email_address: values.email_address,
        firstname: values.firstname
      }).subscribe(data => {
        this.userServ.user_login_details.guest_id = data.guest_id
        setTimeout(() => {
          this.commonMssgServ.popMessageTransform('OTP Sent', 'off')
          this.userServ.initialiseVerify.set(true)
          this.userServ.validityTimer()
          setTimeout(() => {
            this.commonMssgServ.commonMssgHide()
          }, 1500)
        }, 1000)
      })
    } else {
      this.commonMssgServ.popMessage('Please Fill The Required Fields Correctly.')
      const list = ['firstname', 'lastname', 'emailAdd', 'password', 'confirmPass']
      for (let entry of list) {
        this.signUpForm.get(entry)?.setValue('')
      }
      setTimeout(() => {
        this.commonMssgServ.commonMssgHide()
      }, 2000)
    }

  }

  passHide() {
    this.passInput.nativeElement.type = 'password'
    this.passVisible.set(false)
  }

  passShow() {
    this.passInput.nativeElement.type = 'text'
    this.passVisible.set(true)
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
    if (this.validPass() && this.validConfPass()) {
      return true
    } else {
      return false
    }
  }

  passDivFocus() {
    this.validPassChars(this.signUpForm.get('password')?.value)
    this.isPassFocused.set(true)
    gsap.to('#password_error', {
      opacity: 1,
      duration: 0.5,
      ease: 'linear'
    })
  }

  confPassFocus() {
    const val = this.signUpForm.get('confirmPass')?.value
    if (val === '') {
      this.errorMssg.confPass.set('')
      gsap.to('#confirmPass_error', {
        opacity: 1,
        duration: 0.5,
        ease: 'linear'
      })
    }
  }

  validateEmail() {
    const elem = this.signUpForm.get('emailAdd')
    const val = elem?.value
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      this.errorMssg.email.set('Valid Email is Supported.')
      this.setValid('email')
    } else {
      elem?.setValue('')
      this.errorMssg.email.set('Invalid Email Not Supported.')
      this.charLimReached('email', 'error')
    }
  }

  setValid(id: string) {
    const animeParams = {
      COLOR: '#a8c3a3',
      DURATION: 0.5,
      EASE: 'linear',
    }
    this.mssgColor.email.set(`${animeParams.COLOR}`)
    gsap.to(`#${id}_label`, {
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
    })
    gsap.to(`#${id}_chars`, {
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
    })
    gsap.to(`#${id}_input`, {
      borderColor: animeParams.COLOR,
      color: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
    })
    gsap.to(`#${id}_error`, {
      opacity: 1,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
    })
  }

  charLimReached(id: string, mssgType: 'warning' | 'error' | 'success') {
    let color = ''
    switch (mssgType) {
      case 'warning': color = '#ffb1a3'; break
      case 'error': color = '#c44f68'; break
      case 'success': color = '#a8c3a3'; break
    }
    const animeParams = {
      COLOR: color,
      DURATION: 0.5,
      EASE: 'linear',
      RESER_COLOR: '#474554',
      RESET_FONT_COLOR: '#ff9d69'
    }
    switch (id) {
      case 'first': this.mssgColor.firstname.set(animeParams.COLOR); break
      case 'last': this.mssgColor.lastname.set(animeParams.COLOR); break
      case 'email': this.mssgColor.email.set(animeParams.COLOR); break
    }
    gsap.to(`#${id}_label`, {
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
      onComplete: () => {
        gsap.to(`#${id}_label`, {
          backgroundColor: animeParams.RESER_COLOR,
          duration: animeParams.DURATION,
          ease: animeParams.EASE
        })
      }
    })
    gsap.to(`#${id}_chars`, {
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
      onComplete: () => {
        gsap.to(`#${id}_chars`, {
          backgroundColor: animeParams.RESER_COLOR,
          duration: animeParams.DURATION,
          ease: animeParams.EASE
        })
      }
    })
    gsap.to(`#${id}_input`, {
      borderColor: animeParams.COLOR,
      color: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
      onComplete: () => {
        gsap.to(`#${id}_input`, {
          borderColor: animeParams.RESER_COLOR,
          duration: animeParams.DURATION,
          color: animeParams.RESET_FONT_COLOR,
          ease: animeParams.EASE
        })
      }
    })
    gsap.to(`#${id}_error`, {
      opacity: 1,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
      onComplete: () => {
        gsap.to(`#${id}_error`, {
          opacity: 0,
          duration: animeParams.DURATION,
          ease: animeParams.EASE
        })
      }
    })
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
      this.mssgColor.pass.set(error)
      this.validPass.set(false)
    } else if (points > 4 && points <= 6) {
      color = orange
      backColor = warning
      this.mssgColor.pass.set(warning)
      this.validPass.set(false)
    } else if (points > 6 && points <= 8) {
      color = yellow
      backColor = warning
      this.mssgColor.pass.set(warning)
      this.validPass.set(false)
    } else if (points > 8) {
      color = green
      backColor = success
      this.mssgColor.pass.set(success)
      this.validPass.set(true)
      this.errorMssg.pass.set('Valid Password Approved.')
    }
    const scale = 0.1 * points
    const animeParams = {
      COLOR: color,
      BACK_COLOR: backColor,
      DURATION: 0.5,
      EASE: 'linear',
      SCALE: scale
    }
    gsap.to('#password_label', {
      backgroundColor: animeParams.BACK_COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
    gsap.to('#password_input', {
      borderColor: animeParams.BACK_COLOR,
      duration: animeParams.DURATION,
      color: animeParams.BACK_COLOR,
      ease: animeParams.EASE
    })
    gsap.to('#password_chars', {
      backgroundColor: animeParams.BACK_COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
    gsap.to('#passBar', {
      scaleX: animeParams.SCALE,
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
  }

  validConfirmPass(state: 'success' | 'error') {
    let color = ''
    switch (state) {
      case 'success': color = '#a8c3a3'; this.validConfPass.set(true); break
      case 'error': color = '#c44f68'; this.validConfPass.set(false); break
    }
    const animeParams = {
      COLOR: color,
      DURATION: 0.5,
      EASE: 'linear'
    }
    this.mssgColor.confPass.set(color)
    gsap.to('#confirmPass_label', {
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
    gsap.to('#confirmPass_input', {
      borderColor: animeParams.COLOR,
      color: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
  }

  passDivsOnBlur(id: 'password' | 'confirmPass') {
    const elem = this.signUpForm.get(id)
    const val = elem?.value
    if (val === '') {
      this.isPassFocused.set(false)
      const animeParams = {
        COLOR: '#474554',
        DURATION: 0.5,
        EASE: 'linear'
      }
      gsap.to(`#${id}_label`, {
        backgroundColor: animeParams.COLOR,
        duration: animeParams.DURATION,
        ease: animeParams.EASE,
      })
      gsap.to(`#${id}_chars`, {
        backgroundColor: animeParams.COLOR,
        duration: animeParams.DURATION,
        ease: animeParams.EASE,
      })
      gsap.to(`#${id}_input`, {
        borderColor: animeParams.COLOR,
        duration: animeParams.DURATION,
        ease: animeParams.EASE,
      })
      gsap.to(`#${id}_error`, {
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
      this.errorMssg.pass.set('Minimum 12 Characters are REQUIRED.')
    } else if (!validations.lowercase) {
      this.errorMssg.pass.set('Minimum 1 Lowercase Letter is REQUIRED.')
    } else if (!validations.uppercase) {
      this.errorMssg.pass.set('Minimum 1 Uppercase Letter is REQUIRED.')
    } else if (!validations.number) {
      this.errorMssg.pass.set('Minimum 1 Number is REQUIRED.')
    } else if (!validations.spcSym) {
      this.errorMssg.pass.set('Minimum 1 Special Charcter is REQUIRED.')
    }
    this.setPassValidation(points)
  }

  checkConfPass(val: string) {
    const pass = this.signUpForm.get('password')?.value
    if (pass === '' || pass !== val) {
      this.errorMssg.confPass.set('Password DO NOT Match.')
      this.validConfirmPass('error')
    } else {
      this.errorMssg.confPass.set('Password MATCHES.')
      this.validConfirmPass('success')
    }
  }

  isATpresent = signal(false)
  ngOnInit() {
    this.signUpForm.get('firstName')?.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()).subscribe(val => {
        const val_lentgh = val.length
        const used_val = val.slice(-1)
        if (val_lentgh > 30) {
          const update_val = val.slice(0, val_lentgh - 1)
          this.signUpForm.get('firstName')?.setValue(update_val)
          this.errorMssg.firstname.set('Character Limit Reached.')
          this.charLimReached('first', 'error')
        } else if (used_val === ' ') {
          const update_val = val.slice(0, val_lentgh - 1)
          this.signUpForm.get('firstName')?.setValue(update_val)
          this.errorMssg.firstname.set('Whitespace is NOT ALLOWED.')
          this.charLimReached('first', 'warning')
        } else if (/[^a-zA-Z]/.test(used_val)) {
          const update_val = val.slice(0, val_lentgh - 1)
          this.signUpForm.get('firstName')?.setValue(update_val)
          this.errorMssg.firstname.set('Special Characters are NOT ALLOWED.')
          this.charLimReached('first', 'warning')
        } else {
          this.chars.firstname.set(val_lentgh)
          this.errorMssg.firstname.set('')
          this.charLimReached('first', 'success')
        }
      })

    this.signUpForm.get('lastName')?.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()).subscribe(val => {
        const val_lentgh = val.length
        const used_val = val.slice(-1)
        if (val_lentgh > 30) {
          const update_val = val.slice(0, val_lentgh - 1)
          this.signUpForm.get('lastName')?.setValue(update_val)
          this.errorMssg.lastname.set('Character Limit Reached.')
          this.charLimReached('last', 'error')
        } else if (used_val === ' ') {
          const update_val = val.slice(0, val_lentgh - 1)
          this.signUpForm.get('lastName')?.setValue(update_val)
          this.errorMssg.lastname.set('Whitespace is NOT ALLOWED.')
          this.charLimReached('last', 'warning')
        } else if (/[^a-zA-Z]/.test(used_val)) {
          const update_val = val.slice(0, val_lentgh - 1)
          this.signUpForm.get('lastName')?.setValue(update_val)
          this.errorMssg.lastname.set('Special Characters are NOT ALLOWED.')
          this.charLimReached('last', 'warning')
        } else {
          this.chars.lastname.set(val_lentgh)
          this.errorMssg.lastname.set('')
          this.charLimReached('last', 'success')
        }
      })

    this.signUpForm.get('emailAdd')?.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()).subscribe(val => {
        const val_lentgh = val.length
        const used_val = val.slice(-1)
        const update_val = val.slice(0, val_lentgh - 1)

        if (/@/.test(update_val)) {
          this.isATpresent.set(true)
        } else {
          this.isATpresent.set(false)
        }

        if (used_val === '@' && this.isATpresent()) {
          this.signUpForm.get('emailAdd')?.setValue(update_val)
          this.errorMssg.email.set('Only a SINGLE @ symbol is ALLOWED.')
          this.charLimReached('email', 'warning')
        } else if (val_lentgh > 150) {
          this.signUpForm.get('emailAdd')?.setValue(update_val)
          this.errorMssg.email.set('Character Limit Reached.')
          this.charLimReached('email', 'error')
        } else if (used_val === ' ') {
          this.signUpForm.get('emailAdd')?.setValue(update_val)
          this.errorMssg.email.set('Whitespace is NOT ALLOWED.')
          this.charLimReached('email', 'warning')
        } else if (/[^a-zA-Z0-9_@\.]/.test(used_val)) {
          this.signUpForm.get('emailAdd')?.setValue(update_val)
          this.errorMssg.email.set('Special Characters are NOT ALLOWED.')
          this.charLimReached('email', 'warning')
        } else {
          this.chars.email.set(val_lentgh)
          this.errorMssg.email.set('')
          this.charLimReached('email', 'success')
        }
      })

    this.signUpForm.get('password')?.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()).subscribe(val => {
        if (val.length > 15) {
          const rep_val = val.slice(0, val.length - 1)
          this.signUpForm.get('password')?.setValue(rep_val)
        } else {
          const confPassValue = this.signUpForm.get('confirmPass')?.value
          if (confPassValue !== '') {
            this.checkConfPass(confPassValue)
          }
          this.chars.pass.set(val.length)
          this.validPassChars(val)
        }
      })

    this.signUpForm.get('confirmPass')?.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()).subscribe(val => {
        this.checkConfPass(val)
      })

    gsap.set('#first_error', {
      opacity: 0,
    })
    gsap.set('#last_error', {
      opacity: 0,
    })
    gsap.set('#passBar', {
      scaleX: 0
    })
  }

}

type VAL = {
  firstname: string,
  lastname: string,
  email_address: string,
  password: string
}