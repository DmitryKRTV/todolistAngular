import { Component, Input, OnInit } from '@angular/core'
import { TaskService } from '../../../../services/task.service'
import { map, Observable } from 'rxjs'
import { Task } from '../../../../models/task.model'

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$!: Observable<Task[]>
  taskTitle = ''
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$.pipe(
      map(tasks => {
        return tasks[this.todoId]
      })
    )
    this.taskService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.taskService.addTask({ title: this.taskTitle, todoId: this.todoId })
    this.taskTitle = ''
  }

  removeTask(data: { taskId: string; todoId: string }) {
    this.taskService.removeTask(data)
  }
}
