import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

  constructor(public service: EmployeeService) {

  }

  submitted: boolean = true

  onSubmit() {
    if (this.service.employeeForm.valid) {
      console.log(this.service.employeeForm.value);
      if (this.service.employeeForm.get('_id')?.value == '') {
        this.service.getEmployeeAllInfo();
        this.service.postEmployee().subscribe(data => {
        console.log(`Form submitted!! ${data}`);
      });

    } else {
      this.service.getEmployeeAllInfo();
      this.service.putEmployee().subscribe(data => {
        console.log(`Form updated!! ${data}`);
      })
    }
  }
  }

  resetForm() {
    this.service.employeeForm.reset();
    this.submitted = false;
  }
}
