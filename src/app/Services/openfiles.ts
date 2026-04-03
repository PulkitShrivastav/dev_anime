import { Injectable, signal } from '@angular/core';
import { IsSaved, AllFiles } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Openfiles {

  files = signal<AllFiles[]>([])

  constructor(private http: HttpClient) { }

  activeFile = signal<string | null>(null)
  activeIndx = signal<number | null>(null)


  isSaved = signal<IsSaved>({})



  isHovering = signal<IsSaved>({})

  updateHoverDiv(filename: string, hover: boolean) {
    this.isHovering()[filename] = hover
  }

  allfiles = signal<any>(null)

  getAllFiles() {
    this.http.get('/api/mydata', { withCredentials: true }).subscribe(data => {
      console.log(data)
      this.allfiles.set(data)
      this.getOpenFiles()
    })
  }


  fileOpen = signal<Record<string, boolean>>({})

  getOpenFiles() {
    this.http.get('/api/users', { withCredentials: true }).subscribe(data => {
      console.log(data)
      let openFiles: any = data
      let newFile = []
      for (let file of this.allfiles()) {
        for (let i of openFiles) {
          if (file.file_name === i) {
            newFile.push(file)
            this.fileOpen()[file.file_name] = true
          }
        }
      }
      this.files.set(newFile)
    })
  }





}
