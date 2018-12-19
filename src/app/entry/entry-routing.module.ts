import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizerGuard, LoginGuard} from '../services/authentication.service';
import {
    MiniprogramInfoResolver,
    MiniprogramListResolver,
    TemplateListResolver,
    WechatOfficialResolver
} from '../services/resolver/wechat.resolver';
import {OfficialBasicComponent} from './official-basic/official-basic.component';
import {OfficialMenuComponent} from './official-menu/official-menu.component';
import {RegisterMiniProgramComponent} from './register-mini-program/register-mini-program.component';
import {MiniProgramBasicComponent} from './mini-program-basic/mini-program-basic.component';
import {ListMiniProgramComponent} from '../list/list-mini-program/list-mini-program.component';
import {ListTemplateComponent} from '../list/list-template/list-template.component';
import {ListUserResolver, WechatUserInfoResolver} from '../services/resolver/user.resolver';
import {ListUserComponent} from '../list/list-user/list-user.component';
import {ListProductComponent} from '../list/list-product/list-product.component';
import {ListOrderComponent} from '../list/list-order/list-order.component';
import {ListCardComponent} from '../list/list-card/list-card.component';
import {ListCardResolver} from '../services/resolver/card.resolver';
import {ListBusinessComponent} from '../list/list-business/list-business.component';
import {ListBusinessResolver} from '../services/resolver/business.resolver';
import {UserInfoComponent} from './user-info/user-info.component';
import {WechatPanelComponent} from './wechat-panel/wechat-panel.component';
import {ScenarioComponent} from './scenario/scenario.component';
import {ScenarioIntroComponent} from './scenario-intro/scenario-intro.component';
import {PrepayComponent} from './prepay/prepay.component';

const __ENTRY_ROUTING__: Routes = [
    {
        path: 'entry/wechat',
        canActivate: [LoginGuard],
        component: WechatPanelComponent,
        resolve: {
            wechatUserInfoResolver: WechatUserInfoResolver
        },
        children: [
            {
                path: 'official/basic',
                component: OfficialBasicComponent,
                resolve: {
                    wechatOfficialResolver: WechatOfficialResolver
                }
            },
            {
                path: 'official/menu',
                canActivate: [AuthorizerGuard],
                component: OfficialMenuComponent
            },
            {
                path: 'official/miniprogram/new',
                canActivate: [AuthorizerGuard],
                component: RegisterMiniProgramComponent
            },
            {
                path: 'miniprogram/list',
                component: ListMiniProgramComponent,
                resolve: {
                    miniprogramListResolver: MiniprogramListResolver
                }
            },
            {
                path: 'miniprogram/info',
                component: MiniProgramBasicComponent,
                resolve: {
                    miniprogramInfoResolver: MiniprogramInfoResolver
                }
            },
            {
                path: 'miniprogram/template',
                component: ListTemplateComponent
            },
            {
                path: 'miniprogram/business',
                component: ListBusinessComponent,
                resolve: {
                    listBusinessResolver: ListBusinessResolver
                }
            },
            {
                path: 'miniprogram/order',
                component: ListOrderComponent,
                resolve: {
                    listBusinessResolver: ListBusinessResolver
                }
            },
            {
                path: 'miniprogram/product',
                component: ListProductComponent,
                resolve: {
                    listBusinessResolver: ListBusinessResolver
                }
            },
            {
                path: 'miniprogram/user/list',
                component: ListUserComponent,
                resolve: {
                    listUserResolver: ListUserResolver
                }
            },
            {
                path: 'miniprogram/user/info',
                component: UserInfoComponent,
                resolve: {
                    wechatUserInfoResolver: WechatUserInfoResolver
                }
            },
            {
                path: 'miniprogram/card/:pid',
                component: ListCardComponent,
                resolve: {
                    listCardResolver: ListCardResolver
                }
            },
            {
                path: 'miniprogram/scenario',
                component: ScenarioComponent
            },
            {
                path: 'miniprogram/scenario/intro',
                component: ScenarioIntroComponent,
                resolve: {
                    templateListResolver: TemplateListResolver
                }
            },
            {
                path: 'prepay',
                component: PrepayComponent
            },
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
        MiniprogramInfoResolver,
        TemplateListResolver,
        WechatUserInfoResolver,
        ListBusinessResolver,
        ListCardResolver
    ]
})
export class EntryRoutingModule {
}
