import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {VerificationCodeComponent} from './verification-code/verification-code.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [
        VerificationCodeComponent
    ],
    exports: [
        VerificationCodeComponent
    ]
})
export class WidgetModule {
}
