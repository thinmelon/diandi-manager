import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizerGuard, LoginGuard} from '../services/authentication.service';
import {WechatOfficialComponent} from './wechat-official/wechat-official.component';
import {
    MiniprogramInfoResolver,
    MiniprogramListResolver,
    TemplateListResolver,
    WechatOfficialResolver
} from '../services/resolver/wechat.resolver';
import {OfficialBasicComponent} from './official-basic/official-basic.component';
import {OfficialMenuComponent} from './official-menu/official-menu.component';
import {BindOfficialComponent} from './bind-official/bind-official.component';
import {RegisterMiniProgramComponent} from './register-mini-program/register-mini-program.component';
import {MiniProgramBasicComponent} from './mini-program-basic/mini-program-basic.component';
import {WechatMiniProgramComponent} from './wechat-mini-program/wechat-mini-program.component';
import {ListMiniProgramComponent} from '../list/list-mini-program/list-mini-program.component';
import {ListTemplateComponent} from '../list/list-template/list-template.component';
import {ListUserResolver, WechatUserInfoResolver} from '../services/resolver/user.resolver';
import {ListUserComponent} from '../list/list-user/list-user.component';
import {ListProductComponent} from '../list/list-product/list-product.component';
import {ListOrderResolver} from '../services/resolver/order.resolver';
import {ListOrderComponent} from '../list/list-order/list-order.component';
import {ListCardComponent} from '../list/list-card/list-card.component';
import {ListCardResolver} from '../services/resolver/card.resolver';
import {ListBusinessComponent} from '../list/list-business/list-business.component';
import {ListBusinessResolver} from '../services/resolver/business.resolver';
import {UserInfoComponent} from './user-info/user-info.component';

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
                path: 'miniprogram/new',
                canActivate: [AuthorizerGuard],
                component: RegisterMiniProgramComponent
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
        component: WechatMiniProgramComponent,
        resolve: {
            wechatUserInfoResolver: WechatUserInfoResolver
        },
        children: [
            {
                path: 'list',
                component: ListMiniProgramComponent,
                resolve: {
                    miniprogramListResolver: MiniprogramListResolver
                }
            },
            {
                path: 'info',
                component: MiniProgramBasicComponent,
                resolve: {
                    miniprogramInfoResolver: MiniprogramInfoResolver
                }
            },
            {
                path: 'template',
                component: ListTemplateComponent,
                resolve: {
                    templateListResolver: TemplateListResolver
                }
            },
            {
                path: 'business',
                component: ListBusinessComponent,
                resolve: {
                    listBusinessResolver: ListBusinessResolver
                }
            },
            {
                path: 'order',
                component: ListOrderComponent,
                resolve: {
                    listOrderResolver: ListOrderResolver
                }
            },
            {
                path: 'product',
                component: ListProductComponent,
                resolve: {
                    listBusinessResolver: ListBusinessResolver
                }
            },
            {
                path: 'user/list',
                component: ListUserComponent,
                resolve: {
                    listUserResolver: ListUserResolver
                }
            },
            {
                path: 'user/info',
                component: UserInfoComponent,
                resolve: {
                    wechatUserInfoResolver: WechatUserInfoResolver
                }
            },
            {
                path: 'card/:pid',
                component: ListCardComponent,
                resolve: {
                    listCardResolver: ListCardResolver
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
        WechatOfficialResolver,
        MiniprogramListResolver,
        MiniprogramInfoResolver,
        TemplateListResolver,
        WechatUserInfoResolver
    ]
})
export class EntryRoutingModule {
}
