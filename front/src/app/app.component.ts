import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardComponent } from './components/card-component/card-component';
import { ButtonComponent } from './components/button-component/button.component';
import { SearchComponent } from './components/search-component/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    ButtonComponent,
    SearchComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  queryParamsSubscription: Subscription | undefined;
  sabiaPaineis: any[] = [];
  filteredPaineis: any[] = [];

  showingInternetPanels: boolean = false;
  onSearchResult(paineis: any[]) {
    this.filteredPaineis = paineis;
  }

  showAllPanels() {
    this.filteredPaineis = [];
    this.showingInternetPanels = false;
  }

  showInternetPanels() {
    this.filteredPaineis = [];
    this.showingInternetPanels = true;
  }

  painelLoader(onlyInternet: boolean) {
    this.showingInternetPanels = onlyInternet;
  }
}
