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

  removeTodo(id: string) {
    this.http
      .delete<CommonResponse>(`${this.url}/todo-lists/${id}`)
      .pipe(
        map(() => {
          return this.todos$.getValue().filter(todo => {
            return todo.id !== id
          })
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  updateTodoTitle(data: { todoId: string; title: string }) {
    this.http
      .put<CommonResponse>(`${this.url}/todo-lists/${data.todoId}`, { title: data.title })
      .pipe(
        map(() => {
          return this.todos$.getValue().map(todo => {
            return todo.id === data.todoId ? { ...todo, title: data.title } : todo
          })
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
}
