import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // num: number;
  // randNum: number;
  // str: string;
  // first_name: string;
  // title = 'public';
  tasks = [];
  taskInfo: string;
  constructor(private _httpService: HttpService){}
  ngOnInit() {
    
  }
  getTasksFromService() {
    console.log("hello");
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Tasks:", data);
      this.tasks = data['tasks'];
    });
  }
  buttonClickLog(event): void {
    console.log("Button is clicked.", event);
  }
  buttonGetAllTasks(event) {
    console.log(event);
    this.getTasksFromService();
  }
  buttonGetTaskData(id) {
    let observable = this._httpService.getTask(id);
    observable.subscribe(data => {
      console.log(data);
      this.taskInfo = data['taskInfo'];
    })
  }
}
