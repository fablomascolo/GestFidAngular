import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'gestfid', loadChildren:() => import('./gestfid/gestfid.module').then(m=>m.GestfidModule)},
  {path:'demo', loadChildren:() => import('./demo/demo.module').then(m=>m.DemoModule)},
  {path:'**', redirectTo: 'gestfid'}
];

@NgModule({
  imports:
  [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }