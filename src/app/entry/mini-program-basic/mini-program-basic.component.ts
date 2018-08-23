import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormModalComponent} from '../../modal/form-modal/form-modal.component';
import {Account, AccountTypeEnum, principalTypeEnum, realnameStatusEnum} from '../../services/diandi.structure';

@Component({
    selector: 'app-mini-program-basic',
    templateUrl: './mini-program-basic.component.html',
    styleUrls: ['./mini-program-basic.component.less']
})
export class MiniProgramBasicComponent implements OnInit {
    public info: Account;

    constructor(private route: ActivatedRoute,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        const that = this;
        this.route.data
            .subscribe((data: { miniprogramInfoResolver: any }) => {
                console.log(data);
                if (data.miniprogramInfoResolver.errcode === 0) {
                    const rawData = data.miniprogramInfoResolver;
                    that.info = new Account(
                        rawData.appid,
                        AccountTypeEnum[rawData.account_type],
                        rawData.head_image_info.head_image_url,
                        rawData.nickname,
                        rawData.principal_name,
                        principalTypeEnum[rawData.principal_type],
                        realnameStatusEnum[rawData.realname_status],
                        rawData.signature_info.signature,
                        rawData.wx_verify_info.qualification_verify,
                        rawData.wx_verify_info.naming_verify
                    );
                }
            });
    }

    setNickname() {
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.title = '设置名称';
        modalRef.componentInstance.hint = '个人号请上传身份证照片，组织号请上传组织机构代码证或营业执照';
        modalRef.componentInstance.keyValues = [
            {
                key: '名称（必填项）',
                type: 'text',
                value: ''
            },
            {
                key: '身份证照片（个人号必填）',
                type: 'file',
                value: ''
            },
            {
                key: '组织机构代码证或营业执照（组织号必填）',
                type: 'file',
                value: ''
            },
            // {
            //     key: '其他证明材料一（选填）',
            //     type: 'file',
            //     value: ''
            // },
            // {
            //     key: '其他证明材料二（选填）',
            //     type: 'file',
            //     value: ''
            // },
            // {
            //     key: '其他证明材料三（选填）',
            //     type: 'file',
            //     value: ''
            // },
            // {
            //     key: '其他证明材料四（选填）',
            //     type: 'file',
            //     value: ''
            // },
            // {
            //     key: '其他证明材料五（选填）',
            //     type: 'file',
            //     value: ''
            // }
        ];
        modalRef.componentInstance.submitBtnText = '提交';
        modalRef.componentInstance.uploadFileEvt.subscribe(response => {
            console.log('===== MiniProgramBasicComponent =====');
            console.log(response);
        });
    }

}
