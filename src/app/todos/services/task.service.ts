import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import { BehaviorSubject, map } from 'rxjs'
import { DomainTask, GetTasksResponse, Task } from '../models/task.model'
import { CommonResponse } from '../../core/models/core.model'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks$ = new BehaviorSubject<DomainTask>({})
  url = environment.baseUrl
  constructor(private http: HttpClient) {}

  getTasks(todoId: string) {
    return this.http
      .get<GetTasksResponse>(`${this.url}/todo-lists/${todoId}/tasks`)
      .pipe(
        map(res => {
          return res.items
        })
      )
      .subscribe((tasks: Task[]) => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todoId] = tasks
        this.tasks$.next(stateTasks)
      })
  }

  addTask(data: { todoId: string; title: string }) {
    this.http
      .post<CommonResponse<{ item: Task }>>(`${this.url}/todo-lists/${data.todoId}/tasks`, {
        title: data.title,
      })
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue()
          stateTasks[data.todoId] = [res.data.item, ...stateTasks[data.todoId]]
          return stateTasks
        })
      )
      .subscribe(tasks => {
        this.tasks$.next(tasks)
      })
  }
}
