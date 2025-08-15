import {
  Component,
  EventEmitter,
  inject,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'card-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  standalone: true,
  imports: [],
})
export class ButtonComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  @Output() showAll = new EventEmitter<void>();
  @Output() showInternet = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<boolean>();

  showingInternetPanels: boolean = false;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.showingInternetPanels = params['internet'] === 'true';
      this.toggle.emit(this.showingInternetPanels);
    });
  }
  showAllPanels() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
    });
    this.showAll.emit();
  }

  showInternetPanels() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { internet: true },
      queryParamsHandling: 'merge',
    });
    this.showInternet.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
