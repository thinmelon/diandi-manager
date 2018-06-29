import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListOrderComponent} from './list/list-order/list-order.component';
import {ListOrderResolver} from './services/resolver/order.resolver';
import {ListProductComponent} from './list/list-product/list-product.component';
import {ListProductResolver} from './services/resolver/product.resolver';
import {EditProductComponent} from './edit/edit-product/edit-product.component';
import {AuthGuard} from './services/authentication.service';
import {LoginComponent} from './login/login.component';

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
        ListProductResolver
    ]
})
export class AppRouterModule {
}
