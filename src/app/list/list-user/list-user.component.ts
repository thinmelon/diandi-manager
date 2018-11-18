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
                    this.users = data.listUserResolver.data.map(item => {
                        return new Manager(
                            ++index,
                            item.headimgurl ? item.headimgurl : '',
                            item.nickname ? item.nickname : '',
                            item.sex ? item.sex : '',
                            item.mobile,
                            item.country ? item.country + item.province + item.city : '',
                            item.lastLogin
                        );
                    });
                }
            });
    }

}
