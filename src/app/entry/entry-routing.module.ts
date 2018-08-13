import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../services/authentication.service';
import {WechatOfficialComponent} from './wechat-official/wechat-official.component';
import {WechatOfficialResolver} from '../services/resolver/wechat.resolver';
import {OfficialBasicComponent} from './official-basic/official-basic.component';

const __ENTRY_ROUTING__: Routes = [
    {
        path: 'entry/wechat/official',
        canActivate: [AuthGuard],
        component: WechatOfficialComponent,
        children: [
            {
                path: 'basic',
                component: OfficialBasicComponent,
                resolve: {
                    wechatOfficialResolver: WechatOfficialResolver
                }
            }
        ]
    }
];

/**
 * There is a small but critical difference.
 * In the AppRoutingModule, you used the static RouterModule.forRoot method to register the routes and application level service providers.
 * In a feature module you use the static forChild method.
 */
@NgModule({
    imports: [RouterModule.forChild(
        __ENTRY_ROUTING__
    )],
    exports: [RouterModule],
    providers: [
        WechatOfficialResolver
    ]
})
export class EntryRoutingModule {
}
