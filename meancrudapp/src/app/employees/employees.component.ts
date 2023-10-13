import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private empService: EmployeeService) {

  }

empList: any;

ngOnInit(): void {
  this.empService.getEmployeeAllInfo().subscribe(data => {
    console.log(data);
    this.empList = data;
  });
}

}
