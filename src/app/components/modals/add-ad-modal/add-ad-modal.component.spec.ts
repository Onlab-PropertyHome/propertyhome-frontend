import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdModalComponent } from './add-ad-modal.component';

describe('AddAdModalComponent', () => {
  let component: AddAdModalComponent;
  let fixture: ComponentFixture<AddAdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
