import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getTasks();
    this.getTaskById("5d784224c16a53121408600c");
    this.createNewTask("Angular test title", "Angular Test Description", true);
  }
  getTasks() {
    let tempObservable = this._http.get('/tasks');
    tempObservable.subscribe(data => console.log("Got our tasks!", data));
  }
  getTaskById(id: String) {
    console.log(id);
    let tempObservable = this._http.get('/tasks/' + id);
    tempObservable.subscribe(data => console.log("Task:", data));
  }
  createNewTask(title: String, description: String = '', completed: boolean = false) {
    let tempObservable = this._http.post('/tasks/create', {
      title: title,
      description: description,
      completeled: completed
    });
    tempObservable.subscribe(data => console.log("New task:", data));
  }
}



// app.post('/tasks/create', (req, res) => {
//   tasks.create(req, res);
// });
// app.put('/tasks/:id', (req, res) => {
//   tasks.update(req, res);
// });
// app.delete('/tasks/:id', (req, res) => {
//   tasks.delete(req, res);
// });