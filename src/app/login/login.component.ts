import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    phone = '';
    message = '';
    btnText = '登录';

    constructor() {
    }

    ngOnInit() {
    }

    login(evt) {
        console.log(evt);
        // TODO: 发送手机号及验证码至后端校验
    }

}
