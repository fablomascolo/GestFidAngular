import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  codFid:string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.codFid = params['codFid'];
      console.log
    })
  }
}
