import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialMenuComponent } from './official-menu.component';

describe('OfficialMenuComponent', () => {
  let component: OfficialMenuComponent;
  let fixture: ComponentFixture<OfficialMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
