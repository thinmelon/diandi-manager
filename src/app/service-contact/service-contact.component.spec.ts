import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceContactComponent } from './service-contact.component';

describe('ServiceContactComponent', () => {
  let component: ServiceContactComponent;
  let fixture: ComponentFixture<ServiceContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
