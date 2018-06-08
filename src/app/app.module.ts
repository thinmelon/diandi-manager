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
import {ListProductComponent} from "./list/list-product/list-product.component";
import {EditProductComponent} from "./edit/edit-product/edit-product.component";
import {AttributeModalComponent} from "./modal/attribute-modal/attribute-modal.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        ListOrderComponent,
        ListProductComponent,
        EditProductComponent,
        RichTextModalComponent,
        AttributeModalComponent
    ],
    entryComponents: [
        RichTextModalComponent,
        AttributeModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
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
