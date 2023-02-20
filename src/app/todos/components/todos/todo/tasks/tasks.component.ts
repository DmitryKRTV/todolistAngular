import { Component, Input, OnInit } from '@angular/core'
import { TaskService } from '../../../../services/task.service'
import { combineLatest, map, Observable } from 'rxjs'
import { Task, UpdateTaskModel } from '../../../../models/task.model'
import { TodosService } from '../../../../services/todos.service'
import { TaskStatusEnum } from '../../../../../core/enums/taskStatus.enum'

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$!: Observable<Task[]>
  taskTitle = ''
  constructor(private taskService: TaskService, private todosService: TodosService) {}

  ngOnInit(): void {
    this.tasks$ = combineLatest([this.taskService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        const tasks = res[0]
        let tasksForTodo: Task[] = tasks[this.todoId]
        const todos = res[1]

        const activeTodo = todos.find(tl => tl.id === this.todoId)

        if (activeTodo?.filter === 'completed') {
          tasksForTodo = tasksForTodo.filter(t => t.status === TaskStatusEnum.completed)
        }
        if (activeTodo?.filter === 'active') {
          tasksForTodo = tasksForTodo.filter(t => t.status === TaskStatusEnum.completed)
        }
        return tasksForTodo
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

  changeTask(data: { taskId: string; todoId: string; model: UpdateTaskModel }) {
    this.taskService.updateTask(data)
  }
}
