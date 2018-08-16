import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniProgramBasicComponent } from './mini-program-basic.component';

describe('MiniProgramBasicComponent', () => {
  let component: MiniProgramBasicComponent;
  let fixture: ComponentFixture<MiniProgramBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniProgramBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniProgramBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
