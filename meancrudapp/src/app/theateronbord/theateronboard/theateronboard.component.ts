import { Component } from '@angular/core';
import { TheateronboardService } from 'src/app/shared/theateronboard.service';
import { TheaterOnboard } from '../../shared/theateronboard.model';


@Component({
  selector: 'app-theateronboard',
  templateUrl: './theateronboard.component.html',
  styleUrls: ['./theateronboard.component.css']
})
export class TheateronboardComponent {

  seatCapacity: any;  
  seatItemsArray: any = [];
  formId: any;

  constructor(public onBoardService: TheateronboardService) {

  }

  ngOnInit(): void {
    this.onBoardService.getTheatersInfo();
  }

  arrayConversion(value: any) {
    for (let i = 1; i <= value; i++) {
      this.seatItemsArray.push(i.toString());
    }
    return this.seatItemsArray
  }

  populateTheaterInfo(selectedTheater: TheaterOnboard, _id: any) {
    console.log("selectedTheater ===> ", selectedTheater);
    this.formId = _id;
    this.onBoardService.theaterOnboardForm.setValue({      
      "theater_name": selectedTheater.theater_name,
      "movie_name" : selectedTheater.movie_name,
      "city" : selectedTheater.city,
      "seats" : selectedTheater.seats,
      "showTime" : selectedTheater.showTime,
      "ticketprice" : selectedTheater.ticketprice
    });
  }

  updateTheaterInfo(updatedForm: any) {
    console.log("updatedForm ===> ", updatedForm);
    console.log("this.formId ===> ", this.formId);

    this.onBoardService.putTheater(updatedForm, this.formId).subscribe(data => {
      console.log(`Theater Form updated!! ${data}`);
  })
 }

 deleteTheater(_id: string) {
  if (confirm('Are you ok to delete this theater?')) {
    this.onBoardService.deleteTheater(_id).subscribe(data => {
      console.log(`Theater Deleted !! ${data}`);

    })
  }
}

  theaterOnboard() {
    let theaterObject = Object.assign(this.onBoardService.theaterOnboardForm.value, { "seats" : this.arrayConversion(this.onBoardService.theaterOnboardForm.value.seats) });
    this.onBoardService.postTheaterOnboard(theaterObject).subscribe(data => {
      console.log("Theater Onboarded Successfully!");
    })
  }

}
