import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment.development'

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true,
      headers: new HttpHeaders().append('api-key', environment['apiKey']),
    })
    return next.handle(request)
  }
}
