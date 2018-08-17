import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
  selector: 'app-bind-mini-program',
  templateUrl: './bind-mini-program.component.html',
  styleUrls: ['./bind-mini-program.component.less']
})
export class BindMiniProgramComponent implements OnInit {
  public miniprogram = '';

  constructor(private backbone: BackboneService) {
  }

  ngOnInit() {
    this.miniprogram = `https://www.pusudo.cn/platform/authority/wechat?auth_type=2&session=${ this.backbone.session }`;
  }

}
