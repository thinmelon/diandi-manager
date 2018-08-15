import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
import {AppRouterModule} from './app.router.module';
import {WidgetModule} from './widget/widget.module';
import {EntryModule} from './entry/entry.module';
import {BackboneService} from './services/diandi.backbone';
import {LoginGuard} from './services/authentication.service';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ListOrderComponent} from './list/list-order/list-order.component';
import {ListProductComponent} from './list/list-product/list-product.component';
import {ListUserComponent} from './list/list-user/list-user.component';
import {ListCardComponent} from './list/list-card/list-card.component';
import {ListBusinessComponent} from './list/list-business/list-business.component';
import {ListEntryComponent} from './list/list-entry/list-entry.component';
import {RichTextModalComponent} from './modal/rich-text-modal/rich-text-modal.component';
import {AttributeModalComponent} from './modal/attribute-modal/attribute-modal.component';
import {ProgressBarModalComponent} from './modal/progress-bar-modal/progress-bar-modal.component';
import {EditProductComponent} from './edit/edit-product/edit-product.component';
import {EditBusinessComponent} from './edit/edit-business/edit-business.component';

@NgModule({
    declarations: [
        AppComponent,
        ListOrderComponent,
        ListProductComponent,
        ListUserComponent,
        ListCardComponent,
        ListBusinessComponent,
        ListEntryComponent,
        EditProductComponent,
        EditBusinessComponent,
        RichTextModalComponent,
        AttributeModalComponent,
        ProgressBarModalComponent,
        LoginComponent,
    ],
    entryComponents: [
        RichTextModalComponent,
        AttributeModalComponent,
        ProgressBarModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        EntryModule,
        AppRouterModule,
        FileUploadModule,
        WidgetModule
    ],
    providers: [
        BackboneService,
        LoginGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
