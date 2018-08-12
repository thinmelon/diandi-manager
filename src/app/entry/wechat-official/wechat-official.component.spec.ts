import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatOfficialComponent } from './wechat-official.component';

describe('WechatOfficialComponent', () => {
  let component: WechatOfficialComponent;
  let fixture: ComponentFixture<WechatOfficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatOfficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
