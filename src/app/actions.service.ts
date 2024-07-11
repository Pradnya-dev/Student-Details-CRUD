import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentInfo } from './interfaces/studentInfo';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  baseURL:string = "http://localhost:3000/students" 
  constructor(private http: HttpClient) { }

  getRecords(){       
    const url = `${this.baseURL}`;
    return this.http.get<StudentInfo[]>(url);
  }

  addRecord(stdData: any){   
    const url = `${this.baseURL}`;
    return this.http.post(url,stdData)
  }

  getRecordById(id:any){     
    const url = `${this.baseURL}/${id}`
    return this.http.get<StudentInfo[]>(url);
  }

  updateRecord(stdData:any){   
    const url = `${this.baseURL}/${stdData.id}`
    return this.http.put(url, stdData)
  }

  deleteRecord(id:any){  
    const url = `${this.baseURL}/${id}`;
    return this.http.delete(url)
  }
}
