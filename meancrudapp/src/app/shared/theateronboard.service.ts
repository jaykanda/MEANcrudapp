import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheateronboardService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/api/theaterboarding';

  theaterOnboardForm  = this.fb.group({
    theater_name: ['', Validators.required],
    movie_name:[''],
    city: [''],
    seats: [''],
    showTime: ['', Validators.required],
    ticketprice: ['', Validators.required]
  });
  
  postTheaterOnboard(theaterObj: any) {
    return this.http.post(this.baseUrl, theaterObj).pipe(catchError(this.errorHandler));
  }

  putTheater() {
    return this.http.put(this.baseUrl + '/' + this.theaterOnboardForm.get('_id')?.value, this.theaterOnboardForm.value).pipe(catchError(this.errorHandler));
  }
  
  deleteTheater(_id :string) {
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
