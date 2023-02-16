import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import { BehaviorSubject } from 'rxjs'
import { Todo } from '../models/todos.model'

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
}
