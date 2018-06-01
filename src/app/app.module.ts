import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRouterModule} from './app.router.module';

import {AppComponent} from './app.component';
import {ListOrderComponent} from './list/list-order/list-order.component';

@NgModule({
    declarations: [
        AppComponent,
        ListOrderComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        AppRouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
