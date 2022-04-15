import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  _specialEvents: any = [];

  constructor(private _eventService: EventService, private _router: Router) { }

  ngOnInit(): void {
    this._eventService.getSpecialEvents()
      .subscribe({
        next: (res) => {
          console.log(res);
          this._specialEvents = res;
        },
        error: (e) => {
          console.error(e)
          if (e instanceof HttpErrorResponse) {
            if (e.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        },
        complete: () => console.info('complete')
      })
  }

}
