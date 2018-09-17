import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioIntroComponent } from './scenario-intro.component';

describe('ScenarioIntroComponent', () => {
  let component: ScenarioIntroComponent;
  let fixture: ComponentFixture<ScenarioIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
