import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
import {AppRouterModule} from './app.router.module';
import {WidgetModule} from './widget/widget.module';
import {BackboneService} from './services/diandi.backbone';
import {AppComponent} from './app.component';
import {ListOrderComponent} from './list/list-order/list-order.component';
import {RichTextModalComponent} from './modal/rich-text-modal/rich-text-modal.component';
import {ListProductComponent} from './list/list-product/list-product.component';
import {EditProductComponent} from './edit/edit-product/edit-product.component';
import {AttributeModalComponent} from './modal/attribute-modal/attribute-modal.component';
import {ProgressBarModalComponent} from './modal/progress-bar-modal/progress-bar-modal.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/authentication.service';
import {ListUserComponent} from './list/list-user/list-user.component';
import {ListCardComponent} from './list/list-card/list-card.component';
import {ListBusinessComponent} from './list/list-business/list-business.component';
import {EditBusinessComponent} from './edit/edit-business/edit-business.component';

@NgModule({
    declarations: [
        AppComponent,
        ListOrderComponent,
        ListProductComponent,
        ListUserComponent,
        ListCardComponent,
        ListBusinessComponent,
        EditProductComponent,
        EditBusinessComponent,
        RichTextModalComponent,
        AttributeModalComponent,
        ProgressBarModalComponent,
        LoginComponent
    ],
    entryComponents: [
        RichTextModalComponent,
        AttributeModalComponent,
        ProgressBarModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
        HttpClientModule,
        AppRouterModule,
        FileUploadModule,
        WidgetModule
    ],
    providers: [
        BackboneService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
