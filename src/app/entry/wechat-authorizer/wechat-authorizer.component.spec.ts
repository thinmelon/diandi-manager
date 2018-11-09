import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatAuthorizerComponent } from './wechat-authorizer.component';

describe('WechatAuthorizerComponent', () => {
  let component: WechatAuthorizerComponent;
  let fixture: ComponentFixture<WechatAuthorizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatAuthorizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatAuthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
