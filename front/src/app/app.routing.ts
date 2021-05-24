import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AvisosComponent } from './components/avisos/avisos.component';



const routes: Routes = [
  {
    path: '',
    component: PrivacyComponent
  },
  {
    path: 'avisos',
    component: AvisosComponent
  },
  { path: '**', component: PrivacyComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
