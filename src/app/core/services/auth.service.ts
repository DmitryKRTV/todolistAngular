import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { HttpClient } from '@angular/common/http'
import { CommonResponse } from '../models/core.model'
import { ResultCodeEnum } from '../enums/resultCode.enum'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.baseUrl

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    this.http.post<CommonResponse>(`${this.url}/auth/login`, data).subscribe(res => {
      if (res.resultCode === ResultCodeEnum.success) {
        this.router.navigate(['/'])
      }
    })
  }
  logout() {
    this.http.delete<CommonResponse>(`${this.url}/auth/login`).subscribe(res => {
      if (res.resultCode === ResultCodeEnum.success) {
        this.router.navigate(['/login'])
      }
    })
  }
  me() {
    this.http.get(`${this.url}/auth/me`).subscribe(() => {})
  }
}
