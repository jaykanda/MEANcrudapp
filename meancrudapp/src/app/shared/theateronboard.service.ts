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

  baseUrl: string = '/api/theaterboarding';

  theaterList: any;

  theaterOnboardForm  = this.fb.group({
    theater_name: ['', Validators.required],
    movie_name:[''],
    city: [''],
    seats: [''],
    showTime: ['', Validators.required],
    ticketprice: ['', Validators.required]
  });

  getTheatersInfo() {
    return this.http.get(this.baseUrl).pipe(catchError(this.errorHandler)).subscribe(data => {
      console.log("all theater info ==> ", data);
      this.theaterList = data;
    });
  }
  
  postTheaterOnboard(theaterObj: any) {
    return this.http.post(this.baseUrl, theaterObj).pipe(catchError(this.errorHandler));
  }

  putTheater(updatedForm: any, _id: any) {
    return this.http.put(this.baseUrl + '/' + _id, updatedForm.value).pipe(catchError(this.errorHandler));
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
