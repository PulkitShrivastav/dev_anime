import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  user_login_details = {
    guest_id: 0,
    firstname: '',
    lastname: '',
    email_address: '',
    myPass: ''
  }

  initialiseVerify = signal(false)
  showTimer = signal(false)
  checkResend = signal(false)
  timerString = signal('02:00')

  validityTimer() {
    this.showTimer.set(true)
    this.checkResend.set(false)
    let min = 1
    let sec = 60
    const myTimer = setInterval(() => {
      if (min === 0 && sec === 0) {
        clearInterval(myTimer)
        this.showTimer.set(false)
        this.checkResend.set(true)
      } else {
        sec -= 1
        if (sec === 0 && min !== 0) {
          min -= 1
          sec = 60
        }
        const que = `0${min} m:${sec < 10 ? `0${sec}` : sec} s.`
        this.timerString.set(que)
      }
    }, 1000);
  }
}
