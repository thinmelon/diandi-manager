import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-register-mini-program',
    templateUrl: './register-mini-program.component.html',
    styleUrls: ['./register-mini-program.component.less']
})
export class RegisterMiniProgramComponent implements OnInit {
    public fastRegisterMiniProgram = '';

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {
        this.fastRegisterMiniProgram = `https://www.pusudo.cn/platform/register/miniprogram?session=${ this.backbone.session }&appid=${ this.backbone.authorizerAppId }`;
    }

}
