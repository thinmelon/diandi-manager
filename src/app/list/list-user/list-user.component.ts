import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Manager} from '../../services/diandi.structure';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.less']
})
export class ListUserComponent implements OnInit {

    users: Manager[];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { listUserResolver: any }) => {
                console.log(data.listUserResolver);
                if (data.listUserResolver.code === 0) {
                    let index = 0;
                    this.users = data.listUserResolver.msg.map(item => {
                        return new Manager(
                            ++index,
                            item.phone,
                            item['3rd_session'],
                            item.description
                        );
                    });
                }
            });
    }

}
