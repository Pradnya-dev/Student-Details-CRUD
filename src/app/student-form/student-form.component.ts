import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<StudentFormComponent>,
    private builder: FormBuilder,
    private actionService: ActionsService
  ) {}

  inputData: any;
  gradeList = ['A+', 'A', 'B', 'C'];
  selectedValue = 'A';
  editData: any;

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.id > 0) {
      this.setStudentData(this.inputData.id);
    }
  }

  myForm = this.builder.group({
    id: this.builder.control('').addValidators(Validators.required),
    name: this.builder.control('').addValidators(Validators.required),
    email: this.builder.control('').addValidators([Validators.required, Validators.email]),
    gender: this.builder.control('').addValidators(Validators.required),
    grade: this.builder.control('').addValidators(Validators.required),
    class: this.builder.control('').addValidators(Validators.required),
  });

  formAction() {
    if(this.inputData.id > 0) {
      this.updateStudent(this.myForm.value);
    } else {
      this.actionService.addRecord(this.myForm.value).subscribe((data) => {
        this.cancelForm();
      });  
    }
  }

  updateStudent(data:any) {
    this.actionService.updateRecord(data).subscribe((data) => {
      this.cancelForm();
    })
    
  }

  setStudentData(id: number) {
    this.actionService.getRecordById(id).subscribe((res) => {
      this.editData = res;
      this.myForm.setValue({
        id: this.editData.id,
        name: this.editData.name,
        email: this.editData.email,
        grade: this.editData.grade,
        gender: this.editData.gender,
        class: this.editData.class,
      });
    });
  }

  cancelForm() {
    this.ref.close();
  }
}
