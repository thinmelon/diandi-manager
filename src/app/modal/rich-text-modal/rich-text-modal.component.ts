import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-rich-text-modal',
    templateUrl: './rich-text-modal.component.html',
    styleUrls: ['./rich-text-modal.component.less']
})
export class RichTextModalComponent {
    @Input() title: string;

    constructor(public activeModal: NgbActiveModal) {
    }

}
