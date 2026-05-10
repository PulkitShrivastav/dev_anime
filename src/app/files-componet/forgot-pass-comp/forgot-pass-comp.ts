import { Component, ElementRef, inject, output, signal, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntil, distinctUntilChanged, Subject } from 'rxjs';
import gsap from 'gsap';
import { NgClass } from '@angular/common';
import { CommonMssgService } from '../../AppServices/common-mssg-service';

@Component({
  selector: 'app-forgot-pass-comp',
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div class="w-[40rem] rounded-lg overflow-hidden border-2 border-[#2a2a2a]">
      <div class="p-4 bg-[#474554] font-medium text-[white]">Please Verify You Email.</div>
      <div class="quicsand text-[16px] text-[#2a2a2a] p-2 m-2  rounded-lg">
        Please enter your email address to begin the verification process.
        A One-Time Password (OTP) will be sent to the provided email address to confirm that
        it belongs to you and to ensure the security of your account.
      </div>
      <div class="w-full px-12 py-4">
        <div #email_label class="cursor-default py-1 px-2 text-[10px] bg-[#474554] rounded-t-lg w-fit quicksand
        font-bold text-[white]">
          Email Address
        </div>
        <input #email_input type="text" class="josefin p-2 w-full outline-none selection:bg-[#aca9bb] selection:text-[white] bg-[#aca9bb]/30 
        rounded-tr-lg rounded-bl-lg text-[16px] h-[2rem] border-2 border-[#474554] caret-[#ff9d69] text-[#ff9d69]"
        (blur)="validateEmail()"
        [formControl]="emailAdd" spellcheck="false" autocomplete="off">
        <div class="cursor-default flex justify-between items-center">
          <div #email_error class="text-[10px] ml-2"
          [style.color]="reactiveElems.msgColor()">{{reactiveElems.myMssg()}}</div>
          <div #email_chars class="py-1 px-2 text-[10px] bg-[#474554] w-[8rem] text-center rounded-b-lg w-fit quicksand font-bold text-[white]">
            Characters: {{reactiveElems.myChars()}}/150
          </div>
        </div>
      </div>

      <div class="flex justify-center mb-4">
        <button #buttonDiv [ngClass]="checksToSubmit() ? 'actvbutton' : 'deactvbutton cursor-default' " 
        (pointerenter)="checksToSubmit() ? pointEnter() : null" 
        (pointerleave)="checksToSubmit() ? pointLeave() : null"
        (click)="checksToSubmit() ? submit() : null">
          <span class="block" #buttonText>Verify</span>
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
export class ForgotPassComp {

  @ViewChild('email_input') email_input!: ElementRef<HTMLInputElement>
  @ViewChild('email_label') email_label!: ElementRef<HTMLDivElement>
  @ViewChild('email_error') email_error!: ElementRef<HTMLDivElement>
  @ViewChild('email_chars') email_chars!: ElementRef<HTMLDivElement>
  @ViewChild('buttonDiv') buttonDiv!: ElementRef<HTMLDivElement>
  @ViewChild('buttonText') buttonText!: ElementRef<HTMLDivElement>

  emailAdd = new FormControl('')
  destroy$ = new Subject()
  myElem: any
  commonMssgServ = inject(CommonMssgService)
  verify = output()

  reactiveElems = {
    msgColor: signal(''),
    myMssg: signal(''),
    myChars: signal(0),
    isATpresent: signal(false),
    validEmail: signal(false)
  }

  submit() {
    this.verify.emit()
    this.commonMssgServ.commonMssg.set('You Have Finally Clicked Submit!!')
    this.commonMssgServ.commonMssgShow()
    setTimeout(() => {
      this.commonMssgServ.commonMssgHide()
    }, 1500)
  }

  pointEnter() {
    gsap.to(this.myElem.buttonDiv, {
      y: -10,
      duration: 0.3,
      ease: 'linear'
    })
    gsap.to(this.myElem.buttonText, {
      y: -5,
      duration: 0.3,
      delay: 0.2,
      ease: 'linear'
    })
  }

  pointLeave() {
    gsap.to(this.myElem.buttonDiv, {
      y: 0,
      duration: 0.3,
      ease: 'linear'
    })
    gsap.to(this.myElem.buttonText, {
      y: 0,
      duration: 0.3,
      delay: 0.2,
      ease: 'linear'
    })
  }

  checksToSubmit() {
    if (this.reactiveElems.validEmail()) {
      return true
    } else {
      return false
    }
  }

  setValid() {
    const animeParams = {
      COLOR: '#a8c3a3',
      DURATION: 0.5,
      EASE: 'linear',
    }
    this.reactiveElems.msgColor.set(`${animeParams.COLOR}`)
    gsap.to(this.myElem.label, {
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
    })
    gsap.to(this.myElem.chars, {
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
    })
    gsap.to(this.myElem.input, {
      borderColor: animeParams.COLOR,
      color: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
    })
    gsap.to(this.myElem.error, {
      opacity: 1,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
    })
  }

  validateEmail() {
    const val = this.emailAdd?.value ?? ''
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      this.reactiveElems.myMssg.set('Valid Email is Supported.')
      this.reactiveElems.validEmail.set(true)
      this.setValid()
    } else {
      this.emailAdd?.setValue('')
      this.reactiveElems.myMssg.set('Invalid Email Not Supported.')
      this.charLimReached('error')
      this.reactiveElems.validEmail.set(false)
    }
  }

  charLimReached(mssgType: 'warning' | 'error' | 'success') {
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
    this.reactiveElems.msgColor.set(animeParams.COLOR)
    gsap.to(this.myElem.label, {
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
      onComplete: () => {
        gsap.to(this.myElem.label, {
          backgroundColor: animeParams.RESER_COLOR,
          duration: animeParams.DURATION,
          ease: animeParams.EASE
        })
      }
    })
    gsap.to(this.myElem.chars, {
      backgroundColor: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
      onComplete: () => {
        gsap.to(this.myElem.chars, {
          backgroundColor: animeParams.RESER_COLOR,
          duration: animeParams.DURATION,
          ease: animeParams.EASE
        })
      }
    })
    gsap.to(this.myElem.input, {
      borderColor: animeParams.COLOR,
      color: animeParams.COLOR,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
      onComplete: () => {
        gsap.to(this.myElem.input, {
          borderColor: animeParams.RESER_COLOR,
          duration: animeParams.DURATION,
          color: animeParams.RESET_FONT_COLOR,
          ease: animeParams.EASE
        })
      }
    })
    gsap.to(this.myElem.error, {
      opacity: 1,
      duration: animeParams.DURATION,
      ease: animeParams.EASE,
      onComplete: () => {
        gsap.to(this.myElem.error, {
          opacity: 0,
          duration: animeParams.DURATION,
          ease: animeParams.EASE
        })
      }
    })
  }

  ngOnInit() {
    this.emailAdd?.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()).subscribe(val => {
        const val_lentgh = val?.length
        const used_val = val?.slice(-1)
        const update_val = val?.slice(0, (val_lentgh ?? 0) - 1) ?? ''

        if (/@/.test(update_val)) {
          this.reactiveElems.isATpresent.set(true)
        } else {
          this.reactiveElems.isATpresent.set(false)
        }

        if (used_val === '@' && this.reactiveElems.isATpresent()) {
          this.emailAdd?.setValue(update_val)
          this.reactiveElems.myMssg.set('Only a SINGLE @ symbol is ALLOWED.')
          this.charLimReached('warning')
        } else if ((val_lentgh ?? 0) > 150) {
          this.emailAdd?.setValue(update_val)
          this.reactiveElems.myMssg.set('Character Limit Reached.')
          this.charLimReached('error')
        } else if (used_val === ' ') {
          this.emailAdd?.setValue(update_val)
          this.reactiveElems.myMssg.set('Whitespace is NOT ALLOWED.')
          this.charLimReached('warning')
        } else if (/[^a-zA-Z0-9_@\.]/.test(used_val ?? '')) {
          this.emailAdd?.setValue(update_val)
          this.reactiveElems.myMssg.set('Special Characters are NOT ALLOWED.')
          this.charLimReached('warning')
        } else {
          this.reactiveElems.myChars.set(val_lentgh ?? 0)
          this.reactiveElems.myMssg.set('')
          this.charLimReached('success')
        }
      })
  }

  ngAfterViewInit() {
    this.myElem = {
      label: this.email_label.nativeElement,
      input: this.email_input.nativeElement,
      error: this.email_error.nativeElement,
      chars: this.email_chars.nativeElement,
      buttonDiv: this.buttonDiv.nativeElement,
      buttonText: this.buttonText.nativeElement
    }
  }

}
