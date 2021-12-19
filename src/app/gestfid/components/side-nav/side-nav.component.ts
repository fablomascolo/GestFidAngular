import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { IClienti } from '../../models/interface';
import { ClientiService } from '../../services/clienti.service';
const SMALL_WIDTH_BK = 400;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public isScreenSmall: boolean;
  clienti: IClienti[];  
  constructor(private breakpointObserver: BreakpointObserver, private clientiService: ClientiService) { }
  ngOnInit(): void {
    this.breakpointObserver      
      .observe([`(max-width: ${SMALL_WIDTH_BK}px)`])
      .subscribe((state: BreakpointState) => 
      {
        console.log(state.matches);
        this.isScreenSmall = state.matches;
      })
      this.getClienti();
  }
  public getClienti(){
    this.clientiService.getAll().subscribe(
      response => {
        console.log('Ricerchiamo tutti i clienti');
        this.clienti = response;
        console.log(this.clienti);
      },
      error =>   {
        console.log(error);
      }
    )
  }
}
