import { Component, OnInit } from '@angular/core';
import { StudentInfo } from '../interfaces/studentInfo';
import { ActionsService } from '../actions.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  constructor(
    private actionService: ActionsService,
    private dialog: MatDialog
  ) {
    this.getAllRecords();
  }

  displayedColumns: string[] = [
    'name',
    'gender',
    'email',
    'class',
    'grade',
    'action',
  ];
  dataSource = new MatTableDataSource<StudentInfo>([]);

  ngOnInit(): void {}

  getAllRecords() {
    this.actionService.getRecords().subscribe((data) => {
      this.dataSource = new MatTableDataSource<StudentInfo>(data);
    });
  }

  openPopup(id: number, title: string) {
    var popup = this.dialog.open(StudentFormComponent, {
      width: '35%',
      height: '550px',
      data: {
        title,
        id,
      },
    });

    popup.afterClosed().subscribe(() => {
      this.getAllRecords();
    });
  }

  EditStudentDetail(id: number) {
    this.openPopup(id, 'Edit Student Details');
  }

  AddStudentDetail() {
    this.openPopup(0, 'Add Student Details');
  }

  DeleteStudent(id: number) {
    if (confirm('Are you sure to delete the record?')) {
      this.actionService.deleteRecord(id).subscribe((data) => {
        this.getAllRecords();
      });
    }
  }
}
