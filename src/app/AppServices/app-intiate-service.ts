import { ElementRef, inject, Injectable, signal } from '@angular/core';
import { AppSyncService } from './app-sync-service';
import { HttpClient } from '@angular/common/http';
import { AllFiles } from '../Services/models';
import { Router } from '@angular/router';
import { FilesService } from './files-service';
import { FileNames } from '../Services/models';

type myResponse = { files: AllFiles[] }
type res_obj = { files: FileNames[] }

@Injectable({
  providedIn: 'root',
})
export class AppIntiateService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  appSyncServ = inject(AppSyncService)
  fileServ = inject(FilesService)
  isLoaded = signal<boolean>(false)


  setFilesInMemory() {
    for (let file of this.appSyncServ.openedFiles()) {
      localStorage.setItem(`${file.file_name}_html`, file.html_code)
      localStorage.setItem(`${file.file_name}_css`, file.css_code)
      localStorage.setItem(`${file.file_name}_js`, file.js_code)
      localStorage.setItem(`${file.file_name}_buttons`, file.buttons)
    }
  }

  getAllFilenames() {
    this.http.get<res_obj>(`/api/data/allfiles`, {
      withCredentials: true
    }).subscribe(data => {
      this.appSyncServ.allFiles.set(data.files)
      console.log(data.files)
      console.log('Files: ', this.appSyncServ.allFiles())
    })
  }

  initSave() {
    for (let file of this.appSyncServ.openedFiles()) {
      this.appSyncServ.isSaved()[file.file_name] = true
    }
  }

  InitiateWebApp() {
    this.http.get<myResponse>(`/api/data/openfiles`, {
      withCredentials: true
    }).subscribe(data => {
      if (data) {
        console.log("DATA: ", data.files)
        this.getAllFilenames()
        this.appSyncServ.openedFiles.set(data.files)
        this.initSave()
        this.setFilesInMemory()
        this.isLoaded.set(true)
        // console.log("Opened Files: ", this.appSyncServ.openedFiles()[0]["file_name"])
        this.router.navigate(['files', this.appSyncServ.openedFiles()[0]["file_name"]])
      } else {
        this.http.get<AllFiles[]>('/api/newfile', { withCredentials: true }).subscribe(data => {
          this.getAllFilenames()
          this.appSyncServ.openedFiles.set(data)
          this.initSave()
          this.setFilesInMemory()
          this.isLoaded.set(true)
          this.router.navigate(['files', this.appSyncServ.openedFiles()[0].file_name])
        })
      }
    })
  }

}