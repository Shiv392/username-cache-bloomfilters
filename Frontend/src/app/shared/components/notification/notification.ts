import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NotificationEvent, NotificationService } from '../../services/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notification',
  imports: [ToastModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  providers: [MessageService]
})
export class Notification implements OnInit, OnDestroy {

  public NotificationService = inject(NotificationService);
  private messageService = inject(MessageService);

  public subject$ = new Subject<void>();

  ngOnInit(): void {
    this.NotificationService.notificationSubject.pipe(takeUntil(this.subject$)).
    subscribe((event : NotificationEvent)=>{
      console.log('event------>', event);
      this.messageService.add({severity : event.type, detail : event.data.detail, summary : event.data.summary});
    })
  }

  ngOnDestroy(): void {
    this.subject$.next();
  }
}
