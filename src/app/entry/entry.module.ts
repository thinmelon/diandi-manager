import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EntryRoutingModule} from './entry-routing.module';
import {OfficialBasicComponent} from './official-basic/official-basic.component';
import {OfficialMenuComponent} from './official-menu/official-menu.component';
import {BindOfficialComponent} from './bind-official/bind-official.component';
import {AuthorizerGuard} from '../services/authentication.service';
import {RegisterMiniProgramComponent} from './register-mini-program/register-mini-program.component';
import {MiniProgramBasicComponent} from './mini-program-basic/mini-program-basic.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {WechatPanelComponent} from './wechat-panel/wechat-panel.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EntryRoutingModule,
        NgbModule.forRoot()
    ],
    declarations: [
        WechatPanelComponent,
        OfficialBasicComponent,
        OfficialMenuComponent,
        BindOfficialComponent,
        MiniProgramBasicComponent,
        RegisterMiniProgramComponent,
        UserInfoComponent
    ],
    providers: [
        AuthorizerGuard
    ]
})
export class EntryModule {
}
