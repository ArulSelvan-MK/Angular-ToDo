import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskToExistingUserComponent } from './add-task-to-existing-user.component';

describe('AddTaskToExistingUserComponent', () => {
  let component: AddTaskToExistingUserComponent;
  let fixture: ComponentFixture<AddTaskToExistingUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskToExistingUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskToExistingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
