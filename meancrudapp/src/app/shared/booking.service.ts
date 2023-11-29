import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }
  
  baseUrl: string = 'http://localhost:3000/api/booking';

  ticketBooking(bookingData: any) {
    console.log("Booking data sent to service file ===> ", bookingData);
    return this.http.post(this.baseUrl, bookingData).pipe(catchError(this.errorHandler));    
  }

  bookingConfirmation() {
    console.log("Confirmed Booking data sent to service file ===> ");
    return this.http.get(this.baseUrl).pipe(catchError(this.errorHandler));    
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
