import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BusinessList} from '../../services/diandi.structure';

@Component({
    selector: 'app-list-business',
    templateUrl: './list-business.component.html',
    styleUrls: ['./list-business.component.less']
})
export class ListBusinessComponent implements OnInit {
    shops: BusinessList[];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { listBusinessResolver: any }) => {
                console.log(data);
                if (data.listBusinessResolver.code === 0) {
                    let index = 0;
                    this.shops = data.listBusinessResolver.msg.map(item => {
                        return new BusinessList(++index,
                            item.bid,
                            item.name,
                            item.status
                        );
                    });
                }
            });
    }

}
