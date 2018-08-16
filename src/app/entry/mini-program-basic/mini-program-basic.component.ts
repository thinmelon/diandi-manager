import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-mini-program-basic',
    templateUrl: './mini-program-basic.component.html',
    styleUrls: ['./mini-program-basic.component.less']
})
export class MiniProgramBasicComponent implements OnInit {
    public miniprograms = [];

    constructor(private route: ActivatedRoute) {
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

}
