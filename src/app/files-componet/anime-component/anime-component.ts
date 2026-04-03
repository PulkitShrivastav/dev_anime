import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { AppSyncService } from '../../AppServices/app-sync-service';
import { AppIntiateService } from '../../AppServices/app-intiate-service';

@Component({
  selector: 'app-anime-component',
  imports: [],
  template: `
      <iframe #animeComp 
        class="w-full h-full"
        sandbox="allow-forms allow-scripts"></iframe>
    `,
  styles: ``,
})
export class AnimeComponent {

  @ViewChild('animeComp') animeComp!: ElementRef<HTMLIFrameElement>;

  appSyncServe = inject(AppSyncService)
  appInitServe = inject(AppIntiateService)

  triggerIframe(mssg: string) {
    this.animeComp.nativeElement.contentWindow?.postMessage(
      { type: mssg, payload: true, }, '*'
    )
  }

  ngAfterViewInit() {
    this.getCode()
  }

  ngOnInit() {
    window.addEventListener('message', (event) => {
      if (event.data?.type !== 'anime_console') {
        return
      }
      const payload = event.data.payload
      let que = Array.isArray(payload) ? payload.map(arg => this.formatArg(arg)).join(' ') : this.formatArg(payload);
      this.appSyncServe.printConsl(que)
    });
  }

  getCode() {
    const fileDiv = this.animeComp.nativeElement;
    fileDiv.srcdoc = this.buildHtml()
  }

  formatArg(arg: any): string {
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg, null, 2);
      } catch {
        return '[Object]';
      }
    }
    return String(arg);
  }

  buildHtml() {
    let actvFile = this.appSyncServe.activeFile().file_name
    let code = `
    
<!DOCTYPE html><!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>
    <style>
      /* Scrollbar Styles */
      ::-webkit-scrollbar {
        width: 6px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #ded6b4a7;
        border-radius: 999px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: #ded6b4a7;
      }

      ${localStorage.getItem(`${actvFile}_css`)}
    </style>

</head>

<body>

    ${localStorage.getItem(`${actvFile}_html`)}

    <script>
    
    function captureConsole(callback) {
    const originalLog = console.log;

      console.log = function (...args) {
        callback(args);
        originalLog.apply(console, args);
      };
    }
    
    captureConsole((msg) => {
      window.parent.postMessage({
      type: 'anime_console',
      payload: msg
      }, "*");
    });

    window.onload = () => {
      window.addEventListener('message', (event) => {
        message = event.data
        switch (message.type) {
          ${this.getButtonsCode()}
        }
      })
    
      ${localStorage.getItem(`${actvFile}_js`)}

    }
    </script>

</body>

</html>

    `
    return code
  }

  getButtonsCode() {
    let filename = this.appSyncServe.activeFile().file_name
    let fileButtons: string = localStorage.getItem(`${filename}_buttons`) ?? ''
    let newButtons = fileButtons ? fileButtons.split('|') : []
    let btnCode = ''
    if (newButtons) {
      for (let button of newButtons) {
        btnCode = `${btnCode}
        case ('${button}'): ${button}(); break;`
      }
      return btnCode
    } else {
      return null
    }
  }

}
