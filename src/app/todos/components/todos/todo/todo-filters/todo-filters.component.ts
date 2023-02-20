import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FilterType } from '../../../../models/todos.model'

@Component({
  selector: 'todo-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.scss'],
})
export class TodoFiltersComponent {
  @Output() changeFilterEvent = new EventEmitter<FilterType>()
  @Input() filter!: FilterType
  changeFilterHandler(filter: FilterType) {
    this.changeFilterEvent.emit(filter)
  }
}
