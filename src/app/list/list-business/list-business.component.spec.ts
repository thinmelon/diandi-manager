import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBusinessComponent } from './list-business.component';

describe('ListBusinessComponent', () => {
  let component: ListBusinessComponent;
  let fixture: ComponentFixture<ListBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
