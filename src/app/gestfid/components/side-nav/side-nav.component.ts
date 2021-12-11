import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';

const SMALL_WIDTH_BK = 400;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  public isScreenSmall: boolean
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    this.breakpointObserver
      //.observe([Breakpoints.Small,Breakpoints.XSmall])
      // .observe(['(max-width: ${SMALL_WIDTH_BK}px)'])
      // .subscribe((state:BreakpointState) => 
      // {
      //   console.log(state.matches);
      //   this.isScreenSmall = state.matches;
      // })

      .observe([`(max-width: ${SMALL_WIDTH_BK}px)`])
      .subscribe((state: BreakpointState) => 
      {
        console.log(state.matches);
        this.isScreenSmall = state.matches;
      })
  }

}
