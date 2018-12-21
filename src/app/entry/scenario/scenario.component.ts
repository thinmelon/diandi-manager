import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.less']
})
export class ScenarioComponent implements OnInit {
    templates = [];

    constructor(private router: Router,
                private route: ActivatedRoute,
                public backbone: BackboneService) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { templateListResolver: any }) => {
                if (data.templateListResolver.code === 0) {
                    this.templates = data.templateListResolver.data.map(item => {
                        item.price = (item.price / 100).toFixed(2);                 //  系统以分为单位，转换为元，精确到分
                        return item;
                    });
                }
            });
    }

    details(template: any) {
        this.router.navigate(['entry/wechat/miniprogram/scenario/intro',
            {
                template: JSON.stringify({
                    templateId: template.templateId,
                    userDesc: template.userDesc,
                    userVersion: template.userVersion,
                    price: template.price,
                    shouldHavaBusiness: template.shouldHavaBusiness,
                }),
                channel: this.backbone.channel
            }
        ]);
    }

    // intro(scenario) {
    //     if (!this.backbone.authorizerMiniProgramAppId) {
    //         const modalRef = this.modalService.open(FormModalComponent);
    //         modalRef.componentInstance.title = '请选择要进行配置的小程序';
    //         modalRef.componentInstance.hint = '';
    //         modalRef.componentInstance.keyValues = [
    //             {
    //                 index: 0,
    //                 key: '',
    //                 type: 'dropdown',
    //                 value: '请选择小程序',
    //                 src: this.miniprograms,
    //                 categoryId: 0
    //             }
    //         ];
    //         modalRef.componentInstance.submitBtnText = '确定';
    //         modalRef.componentInstance.dropdownSelectedEvt.subscribe(res => {
    //             //  获取小程序基础信息
    //             this.backbone.fetchMiniprogramInfo(this.backbone.session, res.id)
    //                 .subscribe(info => {
    //                     if (info.errcode === 0) {
    //                         console.log(info.signature_info.signature);
    //                         modalRef.componentInstance.extra = `【${ info.nickname }】${ info.signature_info.signature }`;
    //                     }
    //                 });
    //         });
    //         modalRef.componentInstance.submitEvt.subscribe(response => {
    //             if (response[0].categoryId && response[0].categoryId !== 0) {
    //                 this.backbone.authorizerMiniProgramAppId = response[0].categoryId;
    //                 this.onSelected(scenario);
    //             }
    //         });
    //     } else {
    //         this.onSelected(scenario);
    //     }
    // }
    //
    // onSelected(scenario) {
    //     switch (scenario) {
    //         case ENUM_SCENARIO.COMMERCE:
    //             this.router.navigate(['entry/wechat/miniprogram/scenario/intro',
    //                 {
    //                     precondition: JSON.stringify(new Precondition(
    //                         ENUM_SCENARIO.COMMERCE,
    //                         true
    //                     ))
    //                 }
    //             ]);
    //             break;
    //         case ENUM_SCENARIO.MAP:
    //             this.router.navigate(['entry/wechat/miniprogram/scenario/intro',
    //                 {
    //                     precondition: JSON.stringify(new Precondition(
    //                         ENUM_SCENARIO.MAP,
    //                         false
    //                     ))
    //                 }
    //             ]);
    //             break;
    //         default:
    //             break;
    //     }
    // }
}
