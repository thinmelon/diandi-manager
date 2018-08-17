import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizerGuard, LoginGuard} from '../services/authentication.service';
import {WechatOfficialComponent} from './wechat-official/wechat-official.component';
import {
    MiniprogramInfoResolver, MiniprogramListResolver,
    WechatOfficialResolver
} from '../services/resolver/wechat.resolver';
import {OfficialBasicComponent} from './official-basic/official-basic.component';
import {OfficialMenuComponent} from './official-menu/official-menu.component';
import {BindOfficialComponent} from './bind-official/bind-official.component';
import {RegisterMiniProgramComponent} from './register-mini-program/register-mini-program.component';
import {MiniProgramListComponent} from './mini-program-list/mini-program-list.component';
import {MiniProgramBasicComponent} from './mini-program-basic/mini-program-basic.component';
import {BindMiniProgramComponent} from './bind-mini-program/bind-mini-program.component';

const __ENTRY_ROUTING__: Routes = [
    {
        path: 'entry/wechat/official',
        canActivate: [LoginGuard],
        component: WechatOfficialComponent,
        children: [
            {
                path: 'basic',
                component: OfficialBasicComponent,
                resolve: {
                    wechatOfficialResolver: WechatOfficialResolver
                }
            },
            {
                path: 'menu',
                canActivate: [AuthorizerGuard],
                component: OfficialMenuComponent
            },
            {
                path: 'miniprogram',
                component: MiniProgramListComponent,
                resolve: {
                    miniprogramListResolver: MiniprogramListResolver
                }
            },
            {
                path: 'miniprogram/new',
                canActivate: [AuthorizerGuard],
                component: RegisterMiniProgramComponent
            },
            {
                path: 'miniprogram/info',
                component: MiniProgramBasicComponent,
                resolve: {
                    miniprogramInfoResolver: MiniprogramInfoResolver
                }
            },
            {
                path: 'bind',
                component: BindOfficialComponent
            }
        ]
    },
    {
        path: 'entry/wechat/miniprogram',
        canActivate: [LoginGuard],
        children: [
            {
                path: 'bind',
                component: BindMiniProgramComponent,
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
        WechatOfficialResolver,
        MiniprogramListResolver,
        MiniprogramInfoResolver
    ]
})
export class EntryRoutingModule {
}
