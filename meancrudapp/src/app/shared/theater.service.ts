import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  constructor(private http: HttpClient) { }

  baseUrl: string = '/api/theaters';

  getTheaterforMovies(movieName: String) {
    let postObj = { "movieName" : movieName };
    console.log("backend theater value for this ==> ", movieName);
    return this.http.post(this.baseUrl, postObj).pipe(catchError(this.errorHandler));    
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
