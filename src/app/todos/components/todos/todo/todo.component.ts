import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Todo } from '../../../models/todos.model'

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: Todo
  @Output() removeTodoEvent = new EventEmitter<string>()
  @Output() showIdEvent = new EventEmitter<string>()

  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id)
  }
}
