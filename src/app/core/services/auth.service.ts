import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { CommonResponse } from '../models/core.model'
import { ResultCodeEnum } from '../enums/resultCode.enum'
import { Router } from '@angular/router'
import { MeResponse } from '../models/auth.model'
import { LoginRequestData } from '../models/auth.model'
import { catchError, EMPTY } from 'rxjs'
import { NotificationService } from './notification.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false
  resolveAuthRequest: Function = () => {}
  authRequest = new Promise(res => {
    this.resolveAuthRequest = res
  })
  url = environment.baseUrl

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<CommonResponse>(`${this.url}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }
  logout() {
    this.http
      .delete<CommonResponse>(`${this.url}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/login'])
        }
      })
  }
  me() {
    this.http
      .get<CommonResponse<MeResponse>>(`${this.url}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth = true
        }
        this.resolveAuthRequest()
      })
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.message)
    return EMPTY
  }
}
