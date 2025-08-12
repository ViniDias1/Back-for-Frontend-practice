import {
  Component,
  EventEmitter,
  inject,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'card-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<any[]>();

  private readonly dataService = inject(DataService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private queryParamsSubscription?: Subscription;

  searchTerm: string = '';
  sabiaPaineis: any[] = [];
  filteredPaineis: any[] = [];
  showingInternetPanels: boolean = false;

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const internetParam = params['internet'];

        this.showingInternetPanels = internetParam === 'true';
        this.loadPaineis(this.showingInternetPanels);

        if (this.searchTerm !== '') {
          this.onSearch();
        }
      }
    );
  }

  private loadPaineis(online: boolean): void {
    this.dataService.getSabiaPaineis(online).subscribe((paineis) => {
      this.sabiaPaineis = paineis;
      this.filteredPaineis = [...paineis];
    });
  }

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (term) {
      this.filteredPaineis = this.sabiaPaineis.filter((painel) =>
        painel.title.toLowerCase().includes(term)
      );
    } else {
      this.filteredPaineis = [...this.sabiaPaineis];
    }

    this.search.emit(this.filteredPaineis);
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }
}
