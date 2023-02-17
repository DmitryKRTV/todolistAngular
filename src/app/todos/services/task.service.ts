import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import { map, Observable } from 'rxjs'
import { GetTasksResponse, Task } from '../models/task.model'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url = environment.baseUrl
  constructor(private http: HttpClient) {}

  getTasks(todoId: string): Observable<Task[]> {
    return this.http.get<GetTasksResponse>(`${this.url}/todo-lists/${todoId}/tasks`).pipe(
      map(res => {
        return res.items
      })
    )
  }
}
