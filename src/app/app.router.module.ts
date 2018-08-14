import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListOrderComponent} from './list/list-order/list-order.component';
import {ListOrderResolver} from './services/resolver/order.resolver';
import {ListProductComponent} from './list/list-product/list-product.component';
import {ListProductResolver} from './services/resolver/product.resolver';
import {ListUserComponent} from './list/list-user/list-user.component';
import {ListUserResolver} from './services/resolver/user.resolver';
import {ListCardComponent} from './list/list-card/list-card.component';
import {ListCardResolver} from './services/resolver/card.resolver';
import {ListBusinessComponent} from './list/list-business/list-business.component';
import {ListBusinessResolver} from './services/resolver/business.resolver';
import {ListEntryComponent} from './list/list-entry/list-entry.component';
import {EditProductComponent} from './edit/edit-product/edit-product.component';
import {AuthGuard} from './services/authentication.service';
import {LoginComponent} from './login/login.component';
import {EditBusinessComponent} from './edit/edit-business/edit-business.component';
import {WechatOfficialComponent} from './entry/wechat-official/wechat-official.component';
import {WechatOfficialResolver} from './services/resolver/wechat.resolver';

const __ROUTES__: Routes = [
    {
        path: 'list',
        canActivate: [AuthGuard],
        children: [
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
                    listProductResolver: ListProductResolver
                }
            },
            {
                path: 'user',
                component: ListUserComponent,
                resolve: {
                    listUserResolver: ListUserResolver
                }
            },
            {
                path: 'card/:pid',
                component: ListCardComponent,
                resolve: {
                    listCardResolver: ListCardResolver
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
                path: 'entry',
                component: ListEntryComponent
            }
        ]
    },
    {
        path: 'edit',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'product',
                component: EditProductComponent
            },
            {
                path: 'business',
                component: EditBusinessComponent
            }
        ]
    },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
    // The forRoot() method is called because a configured router is provided at the app's root.
    // The forRoot() method supplies the Router service providers and directives needed for routing.
    // And performs the initial navigation based on the current browser URL.
    imports: [RouterModule.forRoot(
        __ROUTES__,
        {enableTracing: false}   // <-- debugging purposes only
    )],
    exports: [RouterModule],
    providers: [
        ListOrderResolver,
        ListProductResolver,
        ListUserResolver,
        ListCardResolver,
        ListBusinessResolver,
        WechatOfficialResolver
    ]
})
export class AppRouterModule {
}
