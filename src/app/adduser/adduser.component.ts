import {Component, OnInit} from '@angular/core';
import {TasklistService} from '../tasklist.service';


@Component({selector: 'app-adduser', 
templateUrl: './adduser.component.html', 
styleUrls: ['./adduser.component.css'
]})
export class AdduserComponent implements OnInit {


    constructor(private serviceTodo : TasklistService) {}
    user = '';
    ngOnInit(): void {}
    addToDo(user : any) {
        this.serviceTodo.addTodo(user);
        this.user = '';
    }
}
