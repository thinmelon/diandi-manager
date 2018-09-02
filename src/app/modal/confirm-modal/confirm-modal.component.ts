import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.less']
})
export class ConfirmModalComponent implements OnInit {
    @Input() title: string;
    @Input() content: string;
    @Output() notification = new EventEmitter<any>();

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

}
