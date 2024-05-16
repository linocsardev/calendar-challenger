import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTaskFormComponent } from './ui-task-form.component';

describe('UiTaskFormComponent', () => {
  let component: UiTaskFormComponent;
  let fixture: ComponentFixture<UiTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTaskFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
