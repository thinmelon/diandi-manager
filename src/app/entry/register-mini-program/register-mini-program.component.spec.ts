import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMiniProgramComponent } from './register-mini-program.component';

describe('RegisterMiniProgramComponent', () => {
  let component: RegisterMiniProgramComponent;
  let fixture: ComponentFixture<RegisterMiniProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMiniProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMiniProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
