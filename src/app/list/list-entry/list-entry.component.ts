import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-list-entry',
    templateUrl: './list-entry.component.html',
    styleUrls: ['./list-entry.component.less']
})
export class ListEntryComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    wechat() {
        this.router.navigate(['entry/wechat/official/basic']);
    }
}
