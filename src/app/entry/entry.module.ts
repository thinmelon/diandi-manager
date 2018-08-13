import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EntryRoutingModule} from './entry-routing.module';
import {WechatOfficialComponent} from './wechat-official/wechat-official.component';
import {OfficialBasicComponent} from './official-basic/official-basic.component';

@NgModule({
    imports: [
        CommonModule,
        EntryRoutingModule,
    ],
    declarations: [
        WechatOfficialComponent,
        OfficialBasicComponent
    ],
    providers: []
})
export class EntryModule {
}
