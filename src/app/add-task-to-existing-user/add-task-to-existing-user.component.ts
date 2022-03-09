import { Component, OnInit } from '@angular/core';
import { TasklistService } from '../tasklist.service';


@Component({
  selector: 'app-add-task-to-existing-user',
  templateUrl: './add-task-to-existing-user.component.html',
  styleUrls: ['./add-task-to-existing-user.component.css']  
})
export class AddTaskToExistingUserComponent implements OnInit {
  listUser: String[]=[];
  todoData : any[]=[];
  task='';
 
  constructor(public serviceTodo: TasklistService) { }

  ngOnInit(): void {
    this.serviceTodo.userList.subscribe((userList:any)=>{
      this.todoData=userList;
      this.listUser = this.todoData.map((todo)=>todo.userName);

    }
      );
  }
    assignTask(userName : any,task:any){
    this.serviceTodo.createNewTask(userName,task);
    this.task='';
  }


  
}
