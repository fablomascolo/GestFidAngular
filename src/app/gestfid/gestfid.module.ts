import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ClientiService } from './services/clienti.service';
import { TransazioniService } from './services/transazioni.service';
import { SharedService } from './services/shared.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GestfidAppComponent } from './gestfid-app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MaterialModule } from '../shared/material.module';
import { NewClienteDialogComponent } from './components/new-cliente-dialog/new-cliente-dialog.component';
import { NgModule } from '@angular/core';
import { SalesComponent } from './components/sales/sales.component';
import { SideBarComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NewSpesaDialogComponent } from './components/new-spesa-dialog/new-spesa-dialog.component';



const routes: Routes = [
  {
    path: '', component: GestfidAppComponent,
    children: [
      {path: ':codFid', component: MainContentComponent},
      {path: '', component: MainContentComponent}
    ]
  },
  {path:'**', redirectTo: ''}

];

@NgModule({
  declarations: [GestfidAppComponent, ToolbarComponent, MainContentComponent, SideBarComponent, SalesComponent, NewClienteDialogComponent, NewSpesaDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ClientiService,
    TransazioniService,
    SharedService,
  ]
})
export class GestfidModule { }
