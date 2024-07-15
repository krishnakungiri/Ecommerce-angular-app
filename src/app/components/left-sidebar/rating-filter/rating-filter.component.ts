import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-filter.component.html',
  styleUrl: './rating-filter.component.css'
})
export class RatingFilterComponent {
  @Output() ratingChange = new EventEmitter<number>();

  ratings = [1.5, 2.5, 3.5, 4.5];
  selectedRating: number | null = null;

  selectRating(rating: number) {
    this.selectedRating = rating;
    this.ratingChange.emit(rating);
  }

  isSelected(rating: number): boolean {
    return this.selectedRating == rating;
  }
}
