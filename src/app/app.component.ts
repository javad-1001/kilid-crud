import { Component, OnInit } from '@angular/core';
import { BusyService } from './services/busy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'dyar';

  ngOnInit(): void {

    // console.log('referesh')

  }

}
