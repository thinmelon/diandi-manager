import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMiniProgramComponent } from './list-mini-program.component';

describe('ListMiniProgramComponent', () => {
  let component: ListMiniProgramComponent;
  let fixture: ComponentFixture<ListMiniProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMiniProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMiniProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
