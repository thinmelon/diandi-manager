import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListOrderComponent} from './list/list-order/list-order.component';

const __ROUTES__: Routes = [
    {
        path: 'list',
        children: [
            {
                path: 'order',
                component: ListOrderComponent,
                // resolve: {
                //     departmentListResolver: DepartmentListResolver
                // }
            }
        ]
    },
    {
        path: '',
        redirectTo: '/list/order',
        pathMatch: 'full'
    }
];

@NgModule({
    // The forRoot() method is called because a configured router is provided at the app's root.
    // The forRoot() method supplies the Router service providers and directives needed for routing.
    // And performs the initial navigation based on the current browser URL.
    imports: [RouterModule.forRoot(
        __ROUTES__,
        {enableTracing: true}   // <-- debugging purposes only
    )],
    exports: [RouterModule],
    providers: [
        // HospitalDetailResolver,
    ]
})
export class AppRouterModule {
}
