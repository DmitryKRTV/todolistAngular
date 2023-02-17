import { Component, Input } from '@angular/core'
import { Task } from '../../../../../models/task.model'

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task

  removeTaskHandler() {
    alert('decoy')
  }
}
