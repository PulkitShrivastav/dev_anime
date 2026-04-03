import { inject, Injectable, ElementRef, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { AppSyncService } from './app-sync-service';
import { HttpClient } from '@angular/common/http';
import { AllFiles } from '../Services/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FilesService {

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  appSyncServ = inject(AppSyncService)
  destroys$ = new Subject<void>()
  focusedButton = signal<string>('')

  saveCode(filename: string, keyname: string, code: string, isfakeCall: boolean) {
    if (code) {
      localStorage.setItem(`${filename}_${keyname}`, code)
      if (isfakeCall) {
        this.appSyncServ.didDivChange.update(v => v = false)
      } else {
        this.appSyncServ.isSaved.update(v => ({ ...v, [filename]: false }))
      }
    }
  }

  openThisFile(filename: string, fileID: number) {
    if (this.appSyncServ.openedFiles().find(f => f.file_name === filename)) {
      this.route.navigate(['files', filename])
    }
    else {
      const files = this.appSyncServ.openedFiles()
      let que = ''
      for (let file of files) {
        que = que + file.file_name + '|'
      }
      que = que + filename
      this.http.put<AllFiles[]>(`/api/data/${fileID}/`, {
        fileID: fileID,
        openFiles: que
      }, { withCredentials: true }).subscribe(data => {
        console.log(data)
        this.appSyncServ.openedFiles.update(v => v = [...this.appSyncServ.openedFiles(), data[0]])
        this.route.navigate(['files', filename])
        this.appSyncServ.isSaved.update(save => ({ ...save, [filename]: true }))
        localStorage.setItem(`${filename}_js`, data[0].js_code)
        localStorage.setItem(`${filename}_css`, data[0].css_code)
        localStorage.setItem(`${filename}_html`, data[0].html_code)
        localStorage.setItem(`${filename}_buttons`, data[0].buttons)
      })
    }
  }

}
