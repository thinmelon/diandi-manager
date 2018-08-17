import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindMiniProgramComponent } from './bind-mini-program.component';

describe('BindMiniProgramComponent', () => {
  let component: BindMiniProgramComponent;
  let fixture: ComponentFixture<BindMiniProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindMiniProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindMiniProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
