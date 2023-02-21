import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../../../core/services/notification.service'
import { Observable } from 'rxjs'
import { Notify } from '../../../core/models/notify.model'

@Component({
  selector: 'todo-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent implements OnInit {
  notify$?: Observable<Notify | null>
  ngOnInit(): void {
    this.notify$ = this.notificationService.notify$
  }
  constructor(private notificationService: NotificationService) {}

  closeNotification() {
    this.notificationService.clear()
  }
}
