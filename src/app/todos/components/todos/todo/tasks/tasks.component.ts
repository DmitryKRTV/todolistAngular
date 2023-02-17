import { Component, Input, OnInit } from '@angular/core'
import { TaskService } from '../../../../services/task.service'
import { Observable } from 'rxjs'
import { Task } from '../../../../models/task.model'

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$!: Observable<Task[]>
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks(this.todoId)
  }
}
