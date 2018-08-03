import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessComponent } from './edit-business.component';

describe('EditBusinessComponent', () => {
  let component: EditBusinessComponent;
  let fixture: ComponentFixture<EditBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
