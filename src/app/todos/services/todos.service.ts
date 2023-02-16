import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import { BehaviorSubject, map } from 'rxjs'
import { Todo } from '../models/todos.model'
import { CommonResponse } from '../../core/models/core.model'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  url = environment.baseUrl
  todos$ = new BehaviorSubject<Todo[]>([])

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http.get<Todo[]>(`${this.url}/todo-lists`).subscribe(todos => {
      this.todos$.next(todos)
    })
  }

  addTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${this.url}/todo-lists`, { title })
      .pipe(
        map(res => {
          return [res.data.item, ...this.todos$.getValue()]
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
}
