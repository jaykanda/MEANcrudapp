import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/api/cities';

  cityList: any;
  
  getCityList() {
    return this.http.get(this.baseUrl).pipe(catchError(this.errorHandler)).subscribe(data => {
      this.cityList = data;
    });  
  }
  
  getMoviesByCity(cityValue: String) {
    let postObj = { "cityVal" : cityValue };
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


