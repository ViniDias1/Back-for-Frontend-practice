import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
export const routes: Routes = [
  { path: 'paineis', component: AppComponent },
  { path: '', redirectTo: '/paineis', pathMatch: 'full' },
  { path: '**', redirectTo: '/paineis' },
];
