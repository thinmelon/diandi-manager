import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-mini-program-list',
    templateUrl: './mini-program-list.component.html',
    styleUrls: ['./mini-program-list.component.less']
})
export class MiniProgramListComponent implements OnInit {
    public miniprograms = [];

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        const that = this;
        this.route.data
            .subscribe((data: { miniprogramListResolver: any }) => {
                let index = 0;
                that.miniprograms = data.miniprogramListResolver.map(item => {
                    return {
                        index: ++index,
                        appid: item.appid,
                        funcInfo: item.funcInfo
                    };
                });
            });
    }

    accountInfo(appid) {
        this.router.navigate(['entry/wechat/official/miniprogram/info', {appid: appid}]);
    }
}
