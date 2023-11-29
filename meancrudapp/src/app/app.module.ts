import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CitylistComponent } from './movies/citylist/citylist.component';
import { TheateronboardComponent } from './theateronbord/theateronboard/theateronboard.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    CitylistComponent,
    TheateronboardComponent,
    BookingdetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
