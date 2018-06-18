import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-progress-bar-modal',
  templateUrl: './progress-bar-modal.component.html',
  styleUrls: ['./progress-bar-modal.component.less']
})
export class ProgressBarModalComponent implements OnInit {
  @Input() progress: number;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
