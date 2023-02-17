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
  @Output() editTodoEvent = new EventEmitter<{ todoId: string; title: string }>()

  isEditMode = false
  newTitle = ''

  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id)
  }

  activateEditModeHandler() {
    this.newTitle = this.todo.title
    this.isEditMode = true
  }

  editTitleHandler() {
    this.isEditMode = false
    this.editTodoEvent.emit({ todoId: this.todo.id, title: this.newTitle })
  }
}
