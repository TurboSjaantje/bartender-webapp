import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkDetailComponent } from './drink-detail.component';

describe('DrinkDetailComponent', () => {
  let component: DrinkDetailComponent;
  let fixture: ComponentFixture<DrinkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinkDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
