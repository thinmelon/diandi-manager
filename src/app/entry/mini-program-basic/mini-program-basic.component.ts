import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UrlService} from '../../services/url.service';
import {FormModalComponent} from '../../modal/form-modal/form-modal.component';
import {
    Account,
    AccountTypeEnum,
    AuditStatusEnum,
    Category,
    principalTypeEnum,
    realnameStatusEnum
} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-mini-program-basic',
    templateUrl: './mini-program-basic.component.html',
    styleUrls: ['./mini-program-basic.component.less']
})
export class MiniProgramBasicComponent implements OnInit {
    public info: Account;
    public errorMessage = '';
    public stepOneHint = '1. 设置基本信息（头像、名称、类目为必需项）';
    public stepTwoHint = '2. 设置小程序服务器域名';
    public stepThreeHint = '3. 应用小程序模版';
    private levelOneCategories = [];
    private levelTwoCategories = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        const that = this;
        //  获取小程序基本设置
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
                        null,
                        rawData.principal_name,
                        principalTypeEnum[rawData.principal_type],
                        realnameStatusEnum[rawData.realname_status],
                        rawData.signature_info.signature,
                        rawData.wx_verify_info.qualification_verify,
                        rawData.wx_verify_info.naming_verify
                    );
                }
            });
        //  获取小程序已设置的类目
        this.backbone
            .fetchAuthorizerCategory(this.backbone.session, this.info.appid)
            .subscribe(result => {
                console.log(result);
                if (result.errcode === 0 && result.categories.length > 0) {
                    this.info.categories = result.categories.map(category => {
                        return new Category(
                            category.first,
                            category.first_name,
                            category.second,
                            category.second_name,
                            AuditStatusEnum[category.audit_status],
                            category.audit_reason ? ' - ' + category.audit_reason : ''
                        );
                    });
                } else {
                    that.errorMessage = result.errmsg;
                }
            });

        this.backbone
            .fetchAllCategories(this.backbone.session, this.info.appid)
            .subscribe(result => {
                if (result.errcode === 0) {
                    // 一级类目
                    that.levelOneCategories = result.categories_list.categories.filter(item => {
                        return item.level === 1;
                    });
                    // 二级类目
                    that.levelTwoCategories = result.categories_list.categories.filter(item => {
                        return item.level === 2;
                    });
                } else {
                    that.errorMessage = result.errmsg;
                }
            });
    }

    /**
     * 设置昵称
     */
    setNickname() {
        const that = this;
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.title = '设置名称';
        modalRef.componentInstance.maxFileSize = 2 * 1024 * 1024;
        modalRef.componentInstance.uploadUrl = UrlService.UploadTempMaterial(this.backbone.session, that.info.appid, 'image');
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
        modalRef.componentInstance.submitEvt.subscribe(response => {
            console.log(response);
            that.backbone.setNickname(
                that.backbone.session,
                that.info.appid,
                response[0].src,
                response[1].mediaId === '' ? 'organization' : 'person',
                response[1].mediaId === '' ? response[2].mediaId : response[1].mediaId
            ).subscribe(result => {
                console.log(result);
                that.showErrorMessage(result, '成功设置昵称');
            });
        });
    }

    /**
     * 修改签名
     * @param signature
     */
    modifySignature(signature) {
        const that = this;
        this.backbone.modifySignature(
            this.backbone.session,
            this.info.appid,
            signature
        ).subscribe(result => {
            console.log(result);
            that.showErrorMessage(result, '成功修改签名');
        });
    }

    /**
     * 修改头像
     */
    modifyHeadImage() {
        const that = this;
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.title = '更换头像';
        modalRef.componentInstance.maxFileSize = 2 * 1024 * 1024;
        modalRef.componentInstance.uploadUrl = UrlService.UploadTempMaterial(this.backbone.session, that.info.appid, 'image');
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
        modalRef.componentInstance.submitEvt.subscribe(response => {
            console.log(response);
            that.backbone.modifyHeadImage(
                that.backbone.session,
                that.info.appid,
                response[0].mediaId
            ).subscribe(result => {
                console.log(result);
                that.showErrorMessage(result, '成功修改头像');
            });
        });
    }

    /**
     * 设置类目
     */
    modifyCategories() {
        const that = this;
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.title = '设置类目';
        modalRef.componentInstance.hint = '';
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: '一级类目',
                type: 'dropdown',
                value: '请选择类目',
                src: that.levelOneCategories,
                categoryId: 0
            },
            {
                index: 1,
                key: '二级类目',
                type: 'dropdown',
                value: '请选择类目',
                src: that.levelTwoCategories,
                categoryId: 0
            }
        ];
        modalRef.componentInstance.submitBtnText = '提交';
        modalRef.componentInstance.dropdownSelectedEvt.subscribe(response => {
            // 如果选中的是一级类目，则改变二级目录源
            if (response.level === 1) {
                modalRef.componentInstance.keyValues[1].value = '请选择类目';
                modalRef.componentInstance.keyValues[1].src = that.levelTwoCategories.filter(category => {
                    return category.father === response.id;
                });
                modalRef.componentInstance.keyValues[1].categoryId = 0;
            } else {
                // 反之，由二级类目推断一级类目
                const levelOneCategory = that.levelOneCategories.filter(category => {
                    return category.id === response.father;
                });
                if (levelOneCategory && levelOneCategory.length === 1) {
                    modalRef.componentInstance.keyValues[0].value = levelOneCategory[0].name;
                    modalRef.componentInstance.keyValues[0].categoryId = levelOneCategory[0].id;
                }
            }
        });
        modalRef.componentInstance.submitEvt.subscribe(response => {
            console.log(response);
            that.backbone
                .addCategory(
                    this.backbone.session,
                    that.info.appid,
                    response[0].categoryId,
                    response[1].categoryId
                )
                .subscribe(result => {
                    console.log(result);
                    that.showErrorMessage(result, '成功设置类目');
                    if (result.errcode === 0) {
                        that.info.categories.push(new Category(
                            response[0].categoryId,
                            response[0].value,
                            response[1].categoryId,
                            response[1].value,
                            AuditStatusEnum[1],
                            ''
                        ));
                    }
                });
        });
    }

    /**
     * 移除类目
     * @param category
     */
    removeCategory(category) {
        const that = this;
        console.log(category);
        this.backbone
            .removeCategory(
                this.backbone.session,
                this.info.appid,
                category.firstId,
                category.secondId
            )
            .subscribe(result => {
                that.showErrorMessage(result, '成功移除类目');
                if (result.errcode === 0) {
                    let index = 0;
                    let hit = 0;
                    that.info.categories.map(item => {
                        if (item.firstId === category.firstId &&
                            item.secondId === category.secondId) {
                            hit = index;
                        } else {
                            ++index;
                        }
                    });
                    that.info.categories.splice(hit, 1);
                }
            });
    }

    /**
     * 修改域名
     */
    modifyDomain() {
        const that = this;
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.title = '小程序服务器域名配置';
        modalRef.componentInstance.hint = '授权给第三方的小程序，其服务器域名已默认设置为第三方的服务器。不同域名间以英文分号;分隔';
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: 'request合法域名',
                type: 'text',
                src: 'https://www.pusudo.cn'
            },
            {
                index: 1,
                key: 'socket合法域名',
                type: 'text',
                src: 'wss://www.pusudo.cn'
            },
            {
                index: 2,
                key: 'uploadFile合法域名',
                type: 'text',
                src: 'https://www.pusudo.cn'
            },
            {
                index: 3,
                key: 'downloadFile合法域名',
                type: 'text',
                src: 'https://www.pusudo.cn'
            }
        ];
        modalRef.componentInstance.submitBtnText = '设置';
        modalRef.componentInstance.submitEvt.subscribe(response => {
            console.log(response);
            const config = response.map(item => {
                return item.src.split(';');
            });
            console.log(config);
            that.backbone
                .modifyDomain(
                    that.backbone.session,
                    that.info.appid,
                    config
                )
                .subscribe(result => {
                    that.showErrorMessage(result, '成功修改服务器域名');
                });
        });
    }

    /**
     *      应用小程序模板
     */
    applyTemplate() {
        this.backbone.authorizerMiniProgramAppId = this.info.appid;
        this.router.navigate(['entry/wechat/miniprogram/template']);
    }

    showErrorMessage(err, successMessage) {
        switch (err.errcode) {
            case 0:
                this.errorMessage = successMessage;
                break;
            case 53300:
                this.errorMessage = '超出每月次数限制';
                break;
            case 53301:
                this.errorMessage = '超出可配置类目总数限制';
                break;
            case 53302:
                this.errorMessage = '当前账号主体类型不允许设置此种类目';
                break;
            case 53303:
                this.errorMessage = '提交的参数不合法';
                break;
            case 53304:
                this.errorMessage = '与已有类目重复';
                break;
            case 53305:
                this.errorMessage = '包含未通过IPC校验的类目';
                break;
            case 53306:
                this.errorMessage = '修改类目只允许修改类目资质，不允许修改类目ID';
                break;
            case 53307:
                this.errorMessage = '只有审核失败的类目允许修改';
                break;
            case 53308:
                this.errorMessage = '审核中的类目不允许删除';
                break;
            default:
                break;
        }
    }

}
