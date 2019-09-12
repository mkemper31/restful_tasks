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
  newTask: any;
  isEditing = false;
  editingTask: any;
  constructor(private _httpService: HttpService){
    this.getTasksFromService();
  }
  ngOnInit() {
    this.newTask = { title: '', description: '' };
  }
  getTasksFromService() {
    console.log('hello');
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log('Tasks:', data);
      this.tasks = data['tasks'];
    });
  }
  buttonClickLog(event): void {
    console.log('Button is clicked.', event);
  }
  onSubmit() {
    const observable = this._httpService.createTask(this.newTask);
    observable.subscribe(data => {
      this.getTasksFromService();
      console.log('new task:', data);
    });
    this.newTask = { title: '', description: '' };
  }
  onClickEdit(id) {
    console.log(id);
    const observable = this._httpService.getTask(id);
    observable.subscribe(data => {
      this.editingTask = data['task'];
      this.isEditing = true;
    });
  }
  onClickDelete(id) {
    const observable = this._httpService.deleteTask(id);
    observable.subscribe(data => {
      this.getTasksFromService();
      console.log(data);
    });
  }
  updateTask() {
    const observable = this._httpService.updateTask(this.editingTask);
    observable.subscribe(data => {
      this.getTasksFromService();
      console.log('edited task:', data);
    });
    this.isEditing = false;
    this.editingTask = { title: '', description: '' };
  }
}
