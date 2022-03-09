import { Component, OnInit } from '@angular/core';
import { TasklistService } from '../tasklist.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-all-tasks',
  templateUrl: './view-all-tasks.component.html',
  styleUrls: ['./view-all-tasks.component.css']
})
export class ViewAllTasksComponent implements OnInit {
  todoData : any[]=[];
 
  constructor(public serviceTodo: TasklistService,public dialog: MatDialog) { }

  ngOnInit(){
    this.serviceTodo.userList.subscribe((userList:any)=>{
      this.todoData=userList;
    });
  }

  openDialog(userName: String, taskName: String){
    this.serviceTodo.editIndividulaTask={userName,taskName}
    this.dialog.open(EditDialogComponent, {
      width: '450px',
      height: '350px'
    });
  }

}


@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit-dialog.component.html',
  styleUrls: ['edit-dialog.component.css']
})
export class EditDialogComponent {

  constructor(public serviceTodo: TasklistService,
    public dialogRef: MatDialogRef<EditDialogComponent>
  ) { }

  updateTask(userName: String, taskName: String){
    this.serviceTodo.editTask(userName,taskName);
    this.dialogRef.close();
  }
} 