import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(public empService: EmployeeService) {

  }

  ngOnInit(): void {
    this.empService.getEmployeeAllInfo();
  }

  populateInfo(selectedRec: Employee) {
    this.empService.employeeForm.setValue({
      "_id": selectedRec._id,
      "fullname": selectedRec.fullname,
      "location" : selectedRec.location,
      "position" : selectedRec.position,
      "salary" : selectedRec.salary
    });

  }

  onDelete(_id: string) {
    if (confirm('Are you ok to delete this record?')) {
      this.empService.deleteEmployee(_id).subscribe(res => {
        this.empService.getEmployeeAllInfo();
      })
    }
  }
}
