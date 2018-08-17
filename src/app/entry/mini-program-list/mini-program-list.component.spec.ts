import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniProgramListComponent } from './mini-program-list.component';

describe('MiniProgramListComponent', () => {
  let component: MiniProgramListComponent;
  let fixture: ComponentFixture<MiniProgramListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniProgramListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
