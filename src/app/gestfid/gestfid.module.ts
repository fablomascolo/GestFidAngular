import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GestfidAppComponent } from './gestfid-app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MaterialModule } from '../shared/material.module';

import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RouterModule,Routes } from '@angular/router';

const routes: Routes = [
  { path:'', component:GestfidAppComponent,
     children: [
       {path:'', component:MainContentComponent}
    ]
  },
  {path:'**',redirectTo:''}
]

@NgModule({
  declarations: [
    GestfidAppComponent,
    MainContentComponent,
    SideNavComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule
  ]
})
export class GestfidModule { }
