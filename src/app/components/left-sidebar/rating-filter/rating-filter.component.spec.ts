import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingFilterComponent } from './rating-filter.component';

describe('RatingFilterComponent', () => {
  let component: RatingFilterComponent;
  let fixture: ComponentFixture<RatingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingFilterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RatingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the selectRating method and emit the selected rating', () => {
    jest.spyOn(component.ratingChange, 'emit');
    const rating = 3.5;
    component.selectRating(rating);

    expect(component.selectedRating).toBe(rating);
    expect(component.ratingChange.emit).toHaveBeenCalledWith(rating);
  })

  it('should return false when isSelected is called with diffrent rating', () => {
    const rating = 3.5;
    component.selectedRating = 4.5;
    expect(component.isSelected(rating)).toBeFalsy();
  })
});
