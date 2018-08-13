import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialBasicComponent } from './official-basic.component';

describe('OfficialBasicComponent', () => {
  let component: OfficialBasicComponent;
  let fixture: ComponentFixture<OfficialBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
