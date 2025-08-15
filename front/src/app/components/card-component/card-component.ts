import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { debounceTime, finalize, shareReplay, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'card-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './card-component.html',
  styleUrls: ['./card-component.css'],
})
export class CardComponent implements OnChanges {
  @Output() panelsLoaded = new EventEmitter<boolean>();
  @Input() filteredPaineis: any[] = [];
  @Input() showinginternetpanels: boolean = false;

  loading: boolean = false;

  errorMessage: string = '';
  sabiaPaineis: any[] = [];
  searchTerm: string = '';

  private readonly $triggerTime = new Subject<boolean>();
  private readonly dataService = inject(DataService);

  constructor() {
    this.$triggerTime
      .pipe(debounceTime(500), shareReplay(1))
      .subscribe((onlyInternet) => {
        this.loadPanels(onlyInternet || undefined);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showinginternetpanels']) {
      this.loading = true;
      this.$triggerTime.next(this.showinginternetpanels);
    }
  }

  loadPanels(onlyInternet?: boolean): void {
    this.dataService
      .getSabiaPaineis(onlyInternet)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.sabiaPaineis = data;
          this.panelsLoaded.emit(!!onlyInternet);
        },
        error: () => {
          this.errorMessage = 'Não foi possível carregar os painéis.';
        },
      });
  }
}
