import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EntryRoutingModule} from './entry-routing.module';
import {WechatOfficialComponent} from './wechat-official/wechat-official.component';
import {OfficialBasicComponent} from './official-basic/official-basic.component';
import {OfficialMenuComponent} from './official-menu/official-menu.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EntryRoutingModule,
        NgbModule.forRoot()
    ],
    declarations: [
        WechatOfficialComponent,
        OfficialBasicComponent,
        OfficialMenuComponent
    ],
    providers: []
})
export class EntryModule {
}
