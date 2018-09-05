import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatPanelComponent } from './wechat-panel.component';

describe('WechatPanelComponent', () => {
  let component: WechatPanelComponent;
  let fixture: ComponentFixture<WechatPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
