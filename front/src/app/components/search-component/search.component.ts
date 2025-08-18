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
  sabiaPaineis: any[] = []; // A lista "mestre" para a filtragem atual
  filteredPaineis: any[] = []; // A lista final que será exibida

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const internetParam = params['internet'];

        let filterState: boolean | null = null;
        if (internetParam === 'true') {
          filterState = true;
        } else if (internetParam === 'false') {
          filterState = false;
        }

        this.loadPaineis(filterState);
      }
    );
  }

  private loadPaineis(online: boolean | null): void {
    const onlyInternet: boolean | undefined = online ?? undefined;
    this.dataService.getSabiaPaineis(onlyInternet).subscribe((paineis) => {
      this.sabiaPaineis = paineis;
      this.onSearch();
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
