import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BackboneService} from '../../services/diandi.backbone';
import {FormModalComponent} from '../../modal/form-modal/form-modal.component';

const __ENUM_SCENARIO__ = {
    COMMERCE: 0,
    MAP: 1,
    COUPON: 2,
    STATISTICS: 3,
    DEVELOPMENT: 4
};

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.less']
})
export class ScenarioComponent implements OnInit {
    miniprograms = [];

    constructor(private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.backbone.fetchFastRegisterMiniprogramList(this.backbone.session, '1')
            .subscribe(list => {
                console.log(list);
                let index = 0;
                this.miniprograms = list.map(item => {
                    return {
                        index: index++,
                        id: item.appid,
                        name: item.appid
                    };
                });
            });
    }

    intro(scenario) {
        switch (scenario) {
            case __ENUM_SCENARIO__.COMMERCE:
                break;
            default:
                break;
        }
        console.log(this.backbone.authorizerMiniProgramAppId);
        if (!this.backbone.authorizerMiniProgramAppId) {
            const modalRef = this.modalService.open(FormModalComponent);
            modalRef.componentInstance.title = '请选择要进行配置的小程序';
            modalRef.componentInstance.hint = '';
            modalRef.componentInstance.keyValues = [
                {
                    index: 0,
                    key: '',
                    type: 'dropdown',
                    value: '请选择小程序',
                    src: this.miniprograms,
                    categoryId: 0
                },
            ];
            modalRef.componentInstance.submitBtnText = '提交';
            // TODO: 选择相应的小程序后，显示小程序名称、简介等信息
            // TODO: 修改下小程序的商品列表获取逻辑
            // TODO: 在应用小程序模版时，传入店铺ID
            modalRef.componentInstance.submitEvt.subscribe(response => {
                console.log(response);
                this.backbone.authorizerMiniProgramAppId = response[0].categoryId;
            });
        }
    }
}
