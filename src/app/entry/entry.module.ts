import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FileUploadModule} from 'ng2-file-upload';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EntryRoutingModule} from './entry-routing.module';
import {OfficialBasicComponent} from './official-basic/official-basic.component';
import {OfficialMenuComponent} from './official-menu/official-menu.component';
import {AuthorizerGuard} from '../services/authentication.service';
import {RegisterMiniProgramComponent} from './register-mini-program/register-mini-program.component';
import {MiniProgramBasicComponent} from './mini-program-basic/mini-program-basic.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {WechatPanelComponent} from './wechat-panel/wechat-panel.component';
import {ScenarioComponent} from './scenario/scenario.component';
import {ScenarioIntroComponent} from './scenario-intro/scenario-intro.component';
import {WechatAuthorizerComponent} from './wechat-authorizer/wechat-authorizer.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EntryRoutingModule,
        NgbModule.forRoot(),
        FileUploadModule
    ],
    declarations: [
        WechatPanelComponent,
        OfficialBasicComponent,
        OfficialMenuComponent,
        MiniProgramBasicComponent,
        RegisterMiniProgramComponent,
        ScenarioComponent,
        ScenarioIntroComponent,
        UserInfoComponent,
        WechatAuthorizerComponent
    ],
    providers: [
        AuthorizerGuard
    ]
})
export class EntryModule {
}
