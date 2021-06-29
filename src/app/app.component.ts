import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public todos: Todo[] = [];
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
    this.todos.push(new Todo(1, "Fazer um Café", true))
    this.todos.push(new Todo(2, "Ir trabalhar", true))
    this.todos.push(new Todo(3, "Ir estudar", false))
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo)
    if (index !== -1) {
     this.todos.splice(index, 1); 
    }
  }

  markAsDone(todo: Todo) {
    todo.done = true;
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
  }
  
}