import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { BookingService } from 'src/app/shared/booking.service';
import { CityService } from 'src/app/shared/city.service';
import { TheaterService } from 'src/app/shared/theater.service';

@Component({
  selector: 'app-citylist',
  templateUrl: './citylist.component.html',
  styleUrls: ['./citylist.component.css']
})

export class CitylistComponent implements OnInit {

  constructor(public fb: FormBuilder, public cityService: CityService, public theaterService: TheaterService, public bookService: BookingService) {}

  ngOnInit(): void {
    this.cityService.getCityList();
  }

  movieItemList: any;
  selectedTheaterInfo: any = {};
  cityName: string = "";
  bookingInfo: any;
  seatcount: any;
  bookingAmount: any;
  theaterId: String = "";
  ticketcost: any;
  localStrInfo: any;
  parsedLocalStrInfo: any;
  selectedMovie: string = "";

  

  theaterBookingForm = this.fb.group({
    seats: this.fb.array([]),
    showtime: this.fb.array([])
  });

  onCheckChange(event:any) {
    const formArray: FormArray = this.theaterBookingForm.get('seats') as FormArray;
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0;
        formArray.controls.forEach(ctrl => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onRadioCheckChange(event:any) {
    const formArray: FormArray = this.theaterBookingForm.get('showtime') as FormArray;
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0;
      formArray.controls.forEach(ctrl => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }  
        i++;
      });
    }
  }

  onSelected(cityValue: string) {
    this.cityName = cityValue;
    this.cityService.getMoviesByCity(cityValue).subscribe(data => {
      this.movieItemList = data;
    });
  }

  checkTheaterForMovie(movieName: string) {
    this.selectedMovie = movieName;
    this.theaterService.getTheaterforMovies(movieName).subscribe(data => {
      this.selectedTheaterInfo = data; 
    });
  }

  bookingSubmission() {
    this.seatcount = this.theaterBookingForm.value.seats?.length;
    this.ticketcost =  this.seatcount * this.selectedTheaterInfo[0].ticketprice;
    this.bookingInfo = Object.assign({}, this.theaterBookingForm.value, { "theater_id" : this.selectedTheaterInfo[0]._id, "theatername" : this.selectedTheaterInfo[0].theater_name,"moviename" : this.selectedMovie, "payment" : this.ticketcost,"bookingdate" : new Date() })
    this.bookService.ticketBooking(this.bookingInfo).subscribe(data => {
      console.log(`Booking done! ${data}`);
    });
  }
}


function ctrl(value: AbstractControl<any, any>, index: number, array: AbstractControl<any, any>[]): void {
  throw new Error('Function not implemented.');
}

