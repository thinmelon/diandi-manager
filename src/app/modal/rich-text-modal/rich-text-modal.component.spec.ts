import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextModalComponent } from './rich-text-modal.component';

describe('RichTextModalComponent', () => {
  let component: RichTextModalComponent;
  let fixture: ComponentFixture<RichTextModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
