import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/api/employee';

  employeeForm  = this.fb.group({
    _id : [null],
    fullname: ['', Validators.required],
    position: ['', Validators.required],
    location: [''],
    salary: ['', Validators.required]
  });

  getEmployeeAllInfo() {
    return this.http.get(this.baseUrl);
  }
}
