import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UrlService} from '../../services/url.service';
import {FormModalComponent} from '../../modal/form-modal/form-modal.component';
import {Account, AccountTypeEnum, principalTypeEnum, realnameStatusEnum} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-mini-program-basic',
    templateUrl: './mini-program-basic.component.html',
    styleUrls: ['./mini-program-basic.component.less']
})
export class MiniProgramBasicComponent implements OnInit {
    public info: Account;
    public errorMessage = '';

    constructor(private route: ActivatedRoute,
                private modalService: NgbModal,
                private backbone: BackboneService) {
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
        const that = this;
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.title = '设置名称';
        modalRef.componentInstance.uploadUrl = UrlService.UploadTempMaterial(this.backbone.session, 0);
        modalRef.componentInstance.hint = '个人号请上传身份证照片，组织号请上传组织机构代码证或营业执照';
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: '名称（必填项）',
                type: 'text',
                src: '',
                mediaId: ''
            },
            {
                index: 1,
                key: '身份证照片（个人号必填）',
                type: 'file',
                src: '',
                mediaId: ''
            },
            {
                index: 2,
                key: '组织机构代码证或营业执照（组织号必填）',
                type: 'file',
                src: '',
                mediaId: ''
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
            console.log(response);
            that.backbone.setNickname(
                that.backbone.session,
                that.info.appid,
                response[0].src,
                response[1].mediaId === '' ? 'organization' : 'person',
                response[1].mediaId === '' ? response[2].mediaId : response[1].mediaId
            ).subscribe(result => {
                console.log(result);
            });

        });
    }

    modifySignature(signature) {
        this.backbone.modifySignature(
            this.backbone.session,
            this.info.appid,
            signature
        ).subscribe(result => {
            console.log(result);
            if (result.errcode === 0) {
                this.errorMessage = '成功修改签名';
            }
        });
    }

    modifyHeadImage() {
        const that = this;
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.title = '更换头像';
        modalRef.componentInstance.uploadUrl = UrlService.AddMaterial(this.backbone.session, 0);
        modalRef.componentInstance.hint = '';
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: '上传头像图片',
                type: 'file',
                src: '',
                mediaId: ''
            }
        ];
        modalRef.componentInstance.submitBtnText = '提交';
        modalRef.componentInstance.uploadFileEvt.subscribe(response => {
            console.log(response);
            that.backbone.modifyHeadImage(
                that.backbone.session,
                that.info.appid,
                response[0].mediaId
            ).subscribe(result => {
                console.log(result);
            });
        });
    }

}
