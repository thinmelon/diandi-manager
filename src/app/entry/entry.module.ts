import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EntryRoutingModule} from './entry-routing.module';
import {WechatOfficialComponent} from './wechat-official/wechat-official.component';
import {OfficialBasicComponent} from './official-basic/official-basic.component';
import {OfficialMenuComponent} from './official-menu/official-menu.component';
import {BindOfficialComponent} from './bind-official/bind-official.component';
import {AuthorizerGuard} from '../services/authentication.service';
import {RegisterMiniProgramComponent} from './register-mini-program/register-mini-program.component';
import {MiniProgramBasicComponent} from './mini-program-basic/mini-program-basic.component';
import {WechatMiniProgramComponent} from './wechat-mini-program/wechat-mini-program.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EntryRoutingModule,
        NgbModule.forRoot()
    ],
    declarations: [
        WechatOfficialComponent,
        WechatMiniProgramComponent,
        OfficialBasicComponent,
        OfficialMenuComponent,
        BindOfficialComponent,
        MiniProgramBasicComponent,
        RegisterMiniProgramComponent
    ],
    providers: [
        AuthorizerGuard
    ]
})
export class EntryModule {
}