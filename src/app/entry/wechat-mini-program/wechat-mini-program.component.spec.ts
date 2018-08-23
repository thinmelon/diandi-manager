import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatMiniProgramComponent } from './wechat-mini-program.component';

describe('WechatMiniProgramComponent', () => {
  let component: WechatMiniProgramComponent;
  let fixture: ComponentFixture<WechatMiniProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatMiniProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatMiniProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
