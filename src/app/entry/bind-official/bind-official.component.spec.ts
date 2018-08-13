import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindOfficialComponent } from './bind-official.component';

describe('BindOfficialComponent', () => {
  let component: BindOfficialComponent;
  let fixture: ComponentFixture<BindOfficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindOfficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
