import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  // {path:'gestfid', loadChildren:() => import('./gestfid/gestfid.module').then(m=>m.GestfidModule)},
  // {path:'demo', loadChildren:() => import('./demo/demo.module').then(m=>m.DemoModule)},
  // {path:'**', redirectTo: 'gestfid'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
    //RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
