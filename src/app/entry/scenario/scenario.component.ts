import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ENUM_SCENARIO, Precondition} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';
import {FormModalComponent} from '../../modal/form-modal/form-modal.component';

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.less']
})
export class ScenarioComponent implements OnInit {
    miniprograms = [];

    constructor(private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.backbone.fetchFastRegisterMiniprogramList(this.backbone.session, '1')
            .subscribe(list => {
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
                }
            ];
            modalRef.componentInstance.submitBtnText = '确定';
            modalRef.componentInstance.dropdownSelectedEvt.subscribe(res => {
                //  获取小程序基础信息
                this.backbone.fetchMiniprogramInfo(this.backbone.session, res.id)
                    .subscribe(info => {
                        if (info.errcode === 0) {
                            console.log(info.signature_info.signature);
                            modalRef.componentInstance.extra = `【${ info.nickname }】${ info.signature_info.signature }`;
                        }
                    });
            });
            modalRef.componentInstance.submitEvt.subscribe(response => {
                if (response[0].categoryId && response[0].categoryId !== 0) {
                    this.backbone.authorizerMiniProgramAppId = response[0].categoryId;
                    this.onSelected(scenario);
                }
            });
        } else {
            this.onSelected(scenario);
        }
    }

    onSelected(scenario) {
        switch (scenario) {
            case ENUM_SCENARIO.COMMERCE:
                this.router.navigate(['entry/wechat/miniprogram/scenario/intro',
                    {
                        precondition: JSON.stringify(new Precondition(
                            ENUM_SCENARIO.COMMERCE,
                            true
                        ))
                    }
                ]);
                break;
            default:
                break;
        }
    }
}
