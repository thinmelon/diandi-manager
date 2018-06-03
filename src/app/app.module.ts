import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRouterModule} from './app.router.module';
import {BackboneService} from './services/diandi.backbone';
import {ContainerService} from './services/container.service';
import {AppComponent} from './app.component';
import {ListOrderComponent} from './list/list-order/list-order.component';
import {RichTextModalComponent} from './modal/rich-text-modal/rich-text-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        ListOrderComponent,
        RichTextModalComponent
    ],
    entryComponents: [
        RichTextModalComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        HttpClientModule,
        AppRouterModule
    ],
    providers: [
        BackboneService,
        ContainerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
