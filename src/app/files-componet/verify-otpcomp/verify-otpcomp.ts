import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import gsap from 'gsap';
import { NgClass } from "@angular/common";
import { CommonMssgService } from '../../AppServices/common-mssg-service';
import { UserServices } from '../../AppServices/user-services';
import { Loader } from "../loader/loader";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otpcomp',
  imports: [ReactiveFormsModule, NgClass, Loader],
  template: `

  <div class="w-[50vw] rounded-lg overflow-hidden border-2 border-[#474554]">

    <div class="text-[white] bg-[#474554] p-4 font-medium">
      <span>Please Provide OTP From Your Email.</span>
    </div>

    <div class="relative rounded-lg m-4 p-2 text-[#2a2a2a] font-medium">
      We’ve sent a verification code to <span class="font-extrabold jesfin text-[#ff9d69]">{{userServ.user_login_details.email_address}}</span> 
      from the <span class="exile text-[#ff9d69]">Dev_Anime</span> Team. 
      Please check your inbox and enter the code below to proceed. 
      If you can’t find the email, be sure to check your Spam or Junk folder, as it may occasionally appear there.
      <div #myMSSG class="absolute w-full p-2 top-full left-0 font-bold text-[10px] flex justify-center"
      style="transform-origin: 0% 0%;">
        <span [style.color]="reactiveElems['myMSSG_color']()">{{reactiveElems['myMSSG_text']()}}</span>
      </div>
    </div>

    <div [formGroup]="verfiyForm" (keydown)="handleKey($event)"
    class="p-4 flex items-center justify-center gap-2">
      <input #box_1 (paste)="onPaste($event)" spellcheck="false" autocomplete="one-time-code" (focus)="focusElem('box_1')" (blur)="blurElem('box_1')" formControlName="box_1" type="text" class="w-[3rem] h-[3rem] border-2 border-[#474554] text-[#ff9d69] rounded-lg bg-[#aca9bb]/30 outline-none text-[16px] text-center font-bold quicksand">
      <input #box_2 (paste)="onPaste($event)" spellcheck="false" autocomplete="one-time-code" (focus)="focusElem('box_2')" (blur)="blurElem('box_2')" formControlName="box_2" type="text" class="w-[3rem] h-[3rem] border-2 border-[#474554] text-[#ff9d69] rounded-lg bg-[#aca9bb]/30 outline-none text-[16px] text-center font-bold quicksand">
      <input #box_3 (paste)="onPaste($event)" spellcheck="false" autocomplete="one-time-code" (focus)="focusElem('box_3')" (blur)="blurElem('box_3')" formControlName="box_3" type="text" class="w-[3rem] h-[3rem] border-2 border-[#474554] text-[#ff9d69] rounded-lg bg-[#aca9bb]/30 outline-none text-[16px] text-center font-bold quicksand">
      <input #box_4 (paste)="onPaste($event)" spellcheck="false" autocomplete="one-time-code" (focus)="focusElem('box_4')" (blur)="blurElem('box_4')" formControlName="box_4" type="text" class="w-[3rem] h-[3rem] border-2 border-[#474554] text-[#ff9d69] rounded-lg bg-[#aca9bb]/30 outline-none text-[16px] text-center font-bold quicksand">
      <input #box_5 (paste)="onPaste($event)" spellcheck="false" autocomplete="one-time-code" (focus)="focusElem('box_5')" (blur)="blurElem('box_5')" formControlName="box_5" type="text" class="w-[3rem] h-[3rem] border-2 border-[#474554] text-[#ff9d69] rounded-lg bg-[#aca9bb]/30 outline-none text-[16px] text-center font-bold quicksand">
      <input #box_6 (paste)="onPaste($event)" spellcheck="false" autocomplete="one-time-code" (focus)="focusElem('box_6')" (blur)="blurElem('box_6')" formControlName="box_6" type="text" class="w-[3rem] h-[3rem] border-2 border-[#474554] text-[#ff9d69] rounded-lg bg-[#aca9bb]/30 outline-none text-[16px] text-center font-bold quicksand">
    </div>

    <div class="flex flex-col items-center justify-center m-4 py-4 gap-4">
      <button id="login" [ngClass]="checksToSubmit() ? 'actvbutton' : 'deactvbutton cursor-default' " 
      (pointerenter)="checksToSubmit() ? pointEnter('login') : null" 
      (pointerleave)="checksToSubmit() ? pointLeave('login') : null"
      (click)="checksToSubmit() ? submit() : null">
        <span class="block" id="login_text">Verify</span>
      </button>

      <button class="text-[14px]" (click)="userServ.checkResend() ? submit() : null"
      [ngClass]="reactiveElems['checkResend']() ? 'ExpireButnActv' : 'ExpireButnDactv cursor-default' ">
        @if (!userServ.initialiseVerify()){
          <span class="flex justify-center"><app-loader /></span>
        }
        @else if(userServ.showTimer()){
          <span>Expires In </span> <span>{{userServ.timerString()}}</span>
        } @else {
          <span>Resend OTP</span>
        }
      </button>
    </div>

  </div>

  `,
  styles: `

  .ExpireButnActv{
    background-color: #ff9d69;
    color: rgba($color: #fff, $alpha: 0.7);
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 10rem;
    font-weight: 600;
    transition: all 0.5s;
  }

  .ExpireButnDactv{
    background-color: rgba($color: #aca9bb, $alpha: 0.6);
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 10rem;
    color: #474554;
    font-weight: 600;
    transition: all 0.5s;
  }

  .ExpireButnActv:hover{
    background-color: rgba($color: #ff9d69, $alpha: 0.7);
    color: white;
    transition: all 0.5s;
  }

  .actvbutton{
      background-color: rgba($color: #aca9bb, $alpha: 0.6);
      border-radius: 0.5rem;
      padding: 0.5rem;
      width: 10rem;
      color: #474554;
      font-weight: 600;
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
  `,
})
export class VerifyOTPComp {

  verfiyForm: FormGroup
  constructor(
    private frmBuldr: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.verfiyForm = frmBuldr.group({
      box_1: [''],
      box_2: [''],
      box_3: [''],
      box_4: [''],
      box_5: [''],
      box_6: ['']
    })

    this.formControlElems = {
      box_1: this.verfiyForm.get('box_1'),
      box_2: this.verfiyForm.get('box_2'),
      box_3: this.verfiyForm.get('box_3'),
      box_4: this.verfiyForm.get('box_4'),
      box_5: this.verfiyForm.get('box_5'),
      box_6: this.verfiyForm.get('box_6'),
    }
  }

  @ViewChild('box_1') box_1!: ElementRef<HTMLInputElement>
  @ViewChild('box_2') box_2!: ElementRef<HTMLInputElement>
  @ViewChild('box_3') box_3!: ElementRef<HTMLInputElement>
  @ViewChild('box_4') box_4!: ElementRef<HTMLInputElement>
  @ViewChild('box_5') box_5!: ElementRef<HTMLInputElement>
  @ViewChild('box_6') box_6!: ElementRef<HTMLInputElement>
  @ViewChild('myMSSG') myMSSG!: ElementRef<HTMLDivElement>



  inputElems!: any
  userServ = inject(UserServices)

  reactiveElems: { [key: string]: any } = {
    myMSSG_text: signal('DEFAULT MESSAGE.'),
    myMSSG_color: signal('#474554'),
    OTP_filled: signal(false),
    isSucceded: {
      box_1: false,
      box_2: false,
      box_3: false,
      box_4: false,
      box_5: false,
      box_6: false,
    },
    showingTimer: signal(true),
    valid_timer: signal('02 : 00'),
    checkResend: signal(false),
    blurAfterSetError: signal(false)
  }

  formControlElems!: any
  destroy$ = new Subject()
  commonMssgServ = inject(CommonMssgService)

  submit() {
    this.commonMssgServ.popMessage('Verification in Progress.', true)
    let otp_code = ''
    const _IDS: BOXES[] = ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'box_6']
    for (let id of _IDS) {
      otp_code = otp_code + this.formControlElems[id].value
    }
    this.http.put<Record<'message', string>>('/api/user/verify_otp', this.userServ.user_login_details).subscribe(data => {
      const mssg = data.message
      console.log(data.message)
      switch (mssg) {
        case 'Expired': setTimeout(
          () => {
            this.commonMssgServ.popMessageTransform('The OTP Has Been Expired.', 'off')
            this.reactiveElems['myMSSG_text'].set('EXPIRED OTP.')
            this.forEveryBox('error')
          }, 1000); break
        case 'Wrong': setTimeout(
          () => {
            this.commonMssgServ.popMessageTransform('Entered Code is Incorrect!!', 'off')
            this.reactiveElems['myMSSG_text'].set('WRONG OTP.')
            this.forEveryBox('error')
          }, 1000); break
        case 'Success': setTimeout(
          () => {
            this.commonMssgServ.popMessageTransform('Email Verified.', 'off')
            this.reactiveElems['myMSSG_text'].set('Success.')
            this.forEveryBox('success')
            setTimeout(() => {
              this.router.navigate(['files'])
            }, 1000)
          }, 1000); break
      }
    })
  }

  forEveryBox(state: 'error' | 'success' | 'warning') {
    const _IDS: BOXES[] = ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'box_6']
    let delay = 0
    for (let id of _IDS) {
      setTimeout(() => {
        this.myAnime(state, id, true)
      }, delay)
      delay += 100
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault()
    const val = event.clipboardData?.getData('text') ?? ''
    const pasted_val = val.replace(/\D/g, '')
    if (/[^0-9]/.test(pasted_val ?? '')) {
      this.reactiveElems['blurAfterSetError'].set(true)
      this.reactiveElems['myMSSG_text'].set('Invalid Characters Used.')
      const _IDS: BOXES[] = ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'box_6']
      let delay = 0
      for (let id of _IDS) {
        setTimeout(() => {
          this.myAnime('error', id, true)
        }, delay)
        delay += 200
      }
    } else if (pasted_val?.length > 6) {
      this.reactiveElems['blurAfterSetError'].set(true)
      this.reactiveElems['myMSSG_text'].set('Pasted Content Too Long.')
      const _IDS: BOXES[] = ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'box_6']
      let delay = 0
      for (let id of _IDS) {
        setTimeout(() => {
          this.myAnime('error', id, true)
        }, delay)
        delay += 100
      }
    } else {
      const values = pasted_val.split('')
      const _IDS: BOXES[] = ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'box_6']
      let delay = 0
      for (let [indx, id] of _IDS.entries()) {
        this.formControlElems[id]?.setValue('')
        setTimeout(() => {
          this.formControlElems[id]?.setValue(values[indx])
        }, delay)
        delay += 100
      }
    }
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
    if (this.reactiveElems['OTP_filled']()) {
      return true
    } else {
      return false
    }
  }

  focusElem(_ID: BOXES) {
    this.reactiveElems['isSucceded'][_ID] = false
    const animeParams = {
      COLOR: '#6177ec',
      FONT_COLOR: '#ff9d69',
      DURATION: 0.5,
      EASE: 'power1.out'
    }
    gsap.to(this.inputElems[_ID], {
      borderColor: animeParams.COLOR,
      color: animeParams.FONT_COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE
    })
  }

  blurElem(_ID: BOXES) {
    const animeParams = {
      COLOR: '#474554',
      DURATION: 0.5,
      EASE: 'power1.in',
      RESET_OPACITY: 0,

    }
    if (this.reactiveElems['blurAfterSetError']()) {
      const _IDS: BOXES[] = ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'box_6']
      for (let id of _IDS) {
        gsap.to(this.inputElems[id], {
          borderColor: animeParams.COLOR,
          duration: animeParams.DURATION,
          ease: animeParams.EASE
        })
      }
      gsap.to(this.reactiveElems['message'], {
        opacity: animeParams.RESET_OPACITY,
        duration: animeParams.DURATION,
        ease: animeParams.EASE
      })
      this.reactiveElems['blurAfterSetError'].set(false)
    } else if (!this.reactiveElems['isSucceded'][_ID]) {
      this.formControlElems[_ID]?.setValue('')
      gsap.to(this.inputElems[_ID], {
        borderColor: animeParams.COLOR,
        duration: animeParams.DURATION,
        ease: animeParams.EASE
      })
    }
  }

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      const _IDS: BOXES[] = ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'box_6']
      for (let id of _IDS) {
        this.formControlElems[id]?.setValue('')
        this.focusElem(id)
        this.blurElem(id)
      }
      this.inputElems.box_1.focus()
      this.reactiveElems['OTP_filled'].set(false)
      this.commonMssgServ.commonMssgHide()
      this.reactiveElems['myMSSG_text'].set('')
    }
  }

  myAnime(
    state: 'warning' | 'success' | 'error',
    _ID: BOXES,
    setState: boolean = false,
    staggering: boolean = false
  ) {
    const myColors = {
      warning: '#ffb1a3',
      success: '#a8c3a3',
      error: '#c44f68'
    }
    let myColor = ''
    switch (state) {
      case 'warning': myColor = myColors.warning; break
      case 'success': myColor = myColors.success; break
      case 'error': myColor = myColors.error; break
    }
    if (state === 'success') {
      this.reactiveElems['isSucceded'][_ID] = true
      if (_ID === 'box_6') {
        this.reactiveElems['OTP_filled'].set(true)
      }
    }
    const animeParams = {
      COLOR: myColor,
      RESET_COLOR: '#474554',
      RESET_FONT_COLOR: '#ff9d69',
      OPACITY: 1,
      RESET_OPACITY: 0,
      DURATION: 0.5,
      EASE_ACTIVE: 'power1.out',
      EASE_RESET: 'power1.in',
    }
    this.reactiveElems['myMSSG_color'].set(animeParams.COLOR)
    gsap.to(this.inputElems[_ID], {
      borderColor: animeParams.COLOR,
      color: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE_ACTIVE,
      onComplete: () => {
        if (!setState) {
          gsap.to(this.inputElems[_ID], {
            borderColor: animeParams.RESET_COLOR,
            color: animeParams.RESET_FONT_COLOR,
            duration: animeParams.DURATION,
            ease: animeParams.EASE_RESET
          })
        }
      }
    })
    gsap.to(this.reactiveElems['message'], {
      opacity: animeParams.OPACITY,
      duration: animeParams.DURATION,
      ease: animeParams.EASE_RESET,
      onComplete: () => {
        if (!setState && !staggering) {
          gsap.to(this.reactiveElems['message'], {
            opacity: animeParams.RESET_OPACITY,
            duration: animeParams.DURATION,
            ease: animeParams.EASE_RESET
          })
        }
      }
    })
  }

  ngOnInit() {
    const _IDS: BOXES[] = ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'box_6']
    for (let [indx, id] of _IDS.entries()) {
      this.formControlElems[id]?.valueChanges.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      ).subscribe((val: string) => {
        const val_len = val.length
        const used_val = val.slice(-1)
        if (val_len > 1) {
          this.formControlElems[id]?.setValue('')
          this.myAnime('warning', id)
          this.reactiveElems['OTP_filled'].set(false)
          setTimeout(() => {
            this.focusElem(id)
          }, 600)
          this.reactiveElems['myMSSG_text'].set('WARNING: More Than One Character NOT ALLOWED.')
        } else if (/[0-9]/.test(used_val)) {
          this.myAnime('success', id, true)
          this.reactiveElems['myMSSG_text'].set('')
          if (indx < 5) {
            const foucsElem = `box_${indx + 2}` as BOXES
            this.inputElems[foucsElem].focus()
          }
        } else if (used_val === '') {
          null
        } else {
          this.formControlElems[id]?.setValue('')
          this.myAnime('warning', id)
          this.reactiveElems['OTP_filled'].set(false)
          this.reactiveElems['myMSSG_text'].set('WARNING: Only NUMBER Characters are ALLOWED.')
          setTimeout(() => {
            this.focusElem(id)
          }, 600)
        }
      })
    }


  }

  ngAfterViewInit() {

    this.inputElems = {
      box_1: this.box_1.nativeElement,
      box_2: this.box_2.nativeElement,
      box_3: this.box_3.nativeElement,
      box_4: this.box_4.nativeElement,
      box_5: this.box_5.nativeElement,
      box_6: this.box_6.nativeElement,
    }

    this.reactiveElems['message'] = this.myMSSG.nativeElement
    gsap.set(this.reactiveElems['message'], {
      opacity: 0,
    })

  }

}

type BOXES = 'box_1' | 'box_2' | 'box_3' | 'box_4' | 'box_5' | 'box_6'