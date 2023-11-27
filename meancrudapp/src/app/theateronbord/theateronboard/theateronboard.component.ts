import { Component } from '@angular/core';
import { TheateronboardService } from 'src/app/shared/theateronboard.service';


@Component({
  selector: 'app-theateronboard',
  templateUrl: './theateronboard.component.html',
  styleUrls: ['./theateronboard.component.css']
})
export class TheateronboardComponent {

  seatCapacity: any;  
  seatItemsArray: any = [];

  constructor(public onBoardService: TheateronboardService) {

  }

  ngOnInit() {
    
  }

  arrayConversion(value: any) {
    for (let i = 1; i < value; i++) {
      this.seatItemsArray.push(i.toString());
    }
    return this.seatItemsArray
  }

  theaterOnboard() {
    let theaterObject = Object.assign(this.onBoardService.theaterOnboardForm.value, { "seats" : this.arrayConversion(this.onBoardService.theaterOnboardForm.value.seats) });
    this.onBoardService.postTheaterOnboard(theaterObject).subscribe(data => {
      console.log("Theater Onboarded Successfully!");
    })
  }

}
