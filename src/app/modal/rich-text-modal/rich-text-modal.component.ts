import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-rich-text-modal',
    templateUrl: './rich-text-modal.component.html',
    styleUrls: ['./rich-text-modal.component.less']
})
export class RichTextModalComponent {
    @Input() title: string;
    @Input() orderTime: string;
    @Input() payTime: string;
    @Input() submitRefundTime: string;
    @Input() refundReason: string;
    @Input() refundTime: string;
    @Input() refundSuccessTime: string;
    @Input() status: number;

    /**
     * 退款模式框
     */
    constructor(public activeModal: NgbActiveModal) {
    }
}
