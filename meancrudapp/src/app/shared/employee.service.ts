import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/api/employee';

  employeeForm  = this.fb.group({
    _id : [''],
    fullname: ['', Validators.required],
    position: ['', Validators.required],
    location: [''],
    salary: ['', Validators.required]
  });

  empList: any;

  getEmployeeAllInfo() {
    return this.http.get(this.baseUrl).pipe(catchError(this.errorHandler)).subscribe(data => {
      console.log("all employee info ==> ", data);
      this.empList = data;
  });
  }

  postEmployee() {
    return this.http.post(this.baseUrl, this.employeeForm.value).pipe(catchError(this.errorHandler));
  }

  putEmployee() {
    return this.http.put(this.baseUrl + '/' + this.employeeForm.get('_id')?.value, this.employeeForm.value).pipe(catchError(this.errorHandler));
  }
  
  deleteEmployee(_id :string) {
    return this.http.delete(this.baseUrl + '/' + _id).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured', error.error);
    }
    else {
      console.error(`Backend returned status  ${error.status}, and the body was: `, error.error);
    }
    return throwError(() => {
      new Error('Something bad happened; please try again later');
    })
  }


}
