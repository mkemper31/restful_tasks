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
  constructor(private _httpService: HttpService){}
  ngOnInit() {
    this.getTasksFromService();
  }
  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Tasks:", data);
      console.log(data[0]);
      this.tasks = data['tasks'];
    });
  }
}
