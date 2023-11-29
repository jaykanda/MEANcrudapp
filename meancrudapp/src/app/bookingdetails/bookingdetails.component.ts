import { Component, OnInit } from '@angular/core';
import { BookingService } from '../shared/booking.service';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.css']
})
export class BookingdetailsComponent implements OnInit {

  constructor(public bookingService: BookingService) {

  }

  confirmedBooking: any = [];

  ngOnInit () {
    this.bookingService.bookingConfirmation().subscribe(data => {
      console.log("booked tickets details ==> ", data);
      this.confirmedBooking = data;
    })
  }

}
