import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public tasks: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required,
      ])]
    })
  }

  add() {
    const title = this.form.controls["title"].value;
    const id = this.tasks.length + 1;
    this.tasks.push(new Todo(id, title, false))
    this.save();
    this.clear();
  }

  remove(todo: Todo) {
    const index = this.tasks.indexOf(todo)
    if (index !== -1) {
     this.tasks.splice(index, 1); 
    }
  }

  clear() {
    this.form.reset();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
  }
  
  save() {
    const data = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", data);
  }

}