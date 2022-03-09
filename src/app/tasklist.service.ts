import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';


@Injectable({providedIn: 'root'})
export class TasklistService {
    listdata : any[] = [];
    userList = new BehaviorSubject<any>([]);

    constructor(private snackBar : MatSnackBar, private router : Router) {
        if (localStorage.getItem('taskValues') == null || undefined) {
            localStorage.setItem('taskValues', '[]');
        }
        this.listdata = JSON.parse(localStorage.getItem('taskValues') || '[]');
        this.userList.next(this.listdata);
    }

    editIndividulaTask : any=null;


    addTodo(userName : String) {
        try {
            if (userName === "") {
                this.triggerToaster('Please, fill all the fields', 4);
                return;
            }
            let verifyDuplicate = this.listdata.filter((todoData) => todoData.userName == userName);
            if (verifyDuplicate.length > 0) {
                this.triggerToaster('User Already Exist', 4);

                return;
            }
            let userData = {
                'userName': userName,
                'taskName': []
            };
            this.listdata.push(userData);
            this.userList.next(this.listdata);
            localStorage.setItem('taskValues', JSON.stringify(this.listdata));
            this.triggerToaster('User Created Successfully', 4);
        } catch (e) {
            console.log(e);
            this.triggerToaster('Failed to Create User', 4);
        }
    }

    createNewTask(userName : String, taskName : String) {
        try {
            if (userName === "" || taskName === "") {
                this.triggerToaster('Please, fill all the fields', 4);
                return;
            }
            let flag = 0;
            for (let i = 0; i < this.listdata.length; i++) {
                if (this.listdata[i].userName == userName) {
                    this.listdata[i].taskName.push(taskName);
                    localStorage.setItem('taskValues', JSON.stringify(this.listdata));
                    flag = 1;
                    break;
                }
            }
            if (flag == 1) {
                this.triggerToaster('Task Updated Successfully', 4);
                this.router.navigate([''])
            } else {
                this.triggerToaster('User doesn\'t  Exist', 4);
            }
        } catch (e) {
            console.log(e);
            this.triggerToaster('Failed to Update Task', 4);
        }
    }

    getTodoList() {
        return this.listdata;
    }

    deleteUserRow(userName : String) {
        try {
            let updatedTodoData = this.listdata.filter((todo => todo.userName != userName));
            this.listdata = [... updatedTodoData];
            this.userList.next(this.listdata);
            localStorage.setItem('taskValues', JSON.stringify(this.listdata));
            this.triggerToaster('Deleted Successfully', 4);
        } catch (e) {
            this.triggerToaster('Failed to Delete', 4);
        }
    }


    editTask(userName: String, updatedTask: String){
        try{
          for (let i = 0; i < this.listdata.length; i++) {
            if (this.listdata[i].userName == userName) {
              for(let j = 0; j < this.listdata[i].taskName.length;j++){
                if(this.listdata[i].taskName[j]==this.editIndividulaTask.taskName){
                  this.listdata[i].taskName[j]=updatedTask;
                  localStorage.setItem('taskValues', JSON.stringify(this.listdata));
                  this.editIndividulaTask=null;
                  this.triggerToaster('Task Updated Successfully',3);
                  return;
                }
              }
              
            }
          }
          this.triggerToaster('Failed to Update Task',3);
        }
        catch(e){
          this.triggerToaster('Failed to Update Task',3);
        }
      }

    triggerToaster(message : any, duration : any) {
        this.snackBar.open(message, 'OK', {
            duration: duration * 1000
        });
    }
}
