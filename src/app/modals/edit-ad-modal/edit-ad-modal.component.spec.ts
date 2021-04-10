import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdModalComponent } from './edit-ad-modal.component';

describe('EditAdModalComponent', () => {
  let component: EditAdModalComponent;
  let fixture: ComponentFixture<EditAdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
