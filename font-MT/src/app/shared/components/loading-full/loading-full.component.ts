import { Component, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-loading-full',
  templateUrl: './loading-full.component.html',
  styleUrls: ['./loading-full.component.css']
})
export class LoadingFullComponent implements OnInit {
  size = input<string>('80px');
  isShow = input<boolean>(false);
  constructor() { }

  ngOnInit() {
  }

}
