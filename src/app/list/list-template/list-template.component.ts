import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {BackboneService} from '../../services/diandi.backbone';
import {FormModalComponent} from '../../modal/form-modal/form-modal.component';

@Component({
    selector: 'app-list-template',
    templateUrl: './list-template.component.html',
    styleUrls: ['./list-template.component.less']
})
export class ListTemplateComponent implements OnInit {
    public errorMessage = '';           //  错误提示信息
    public trialQRCode = '';            //  体验二维码 URL
    public applied = [];                //  已应用的模版列表
    public audit = [];                  //  审核模版列表
    public release = [];                //  已发布模版列表
    private pageList = [];              //  页面配置列表
    private firstClass = [];            //  一级类目
    private secondClass = [];           //  二级类目

    constructor(private backbone: BackboneService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.trialQRCode = this.backbone.fetchTrialQRCode(                      //  获取检验二维码URL
            this.backbone.session,
            this.backbone.authorizerMiniProgramAppId
        );

        this.versions();
    }

    /**
     *  授权方所有版本
     */
    versions() {
        this.backbone
            .fetchAuthorizerAllVersions(
                this.backbone.session,
                this.backbone.authorizerMiniProgramAppId
            )
            .subscribe(result => {
                if (result.code === 0) {
                    result.data.map(item => {
                        switch (item.status) {
                            case 0:         //  审核通过
                            case 1:         //  审核失败
                            case 2:         //  审核中
                                this.audit.push(item);
                                break;
                            case 3:         //  提交代码
                                this.applied.push(item);
                                break;
                            case 4:         //  发布可见
                            case 5:         //  发布不可见
                                this.release.push(item);
                                break;
                            default:
                                break;
                        }
                        // item.commitTime = moment(new Date(item.commitTime).getTime()).format('YYYY-MM-DD HH:mm:ss');        //  上传时间
                        // item.submitTime = moment(new Date(item.submitTime).getTime()).format('YYYY-MM-DD HH:mm:ss');        //  审核时间
                        // item.releaseTime = moment(new Date(item.releaseTime).getTime()).format('YYYY-MM-DD HH:mm:ss');      //  发布时间
                    });
                } else {
                    this.errorMessage = result.msg;
                }
            });
    }

    /**
     * 提交审核
     * @param template
     */
    submitAudit(template) {
        this.backbone
            .fetchAuthorizerCategories(                     //  授权方所有可用的类目
                this.backbone.session,
                this.backbone.authorizerMiniProgramAppId
            )
            .subscribe(response => {
                console.log(response);
                if (response.errcode === 0) {
                    this.firstClass.splice(0, this.firstClass.length);
                    this.secondClass.splice(0, this.secondClass.length);
                    response.category_list.map(category => {
                        this.firstClass.push({              //  生成一级类目
                            id: category.first_id,
                            name: category.first_class
                        });
                        this.secondClass.push({             //  生成二级类目
                            id: category.second_id,
                            name: category.second_class
                        });
                    });
                    this.backbone
                        .fetchAuthorizerPages(              //  授权方所有可用的页面配置
                            this.backbone.session,
                            this.backbone.authorizerMiniProgramAppId
                        )
                        .subscribe(result => {
                            console.log(result);
                            if (result.errcode === 0) {     //  生成页面配置列表
                                this.pageList = result.page_list.map(page => {
                                    return {
                                        name: page
                                    };
                                });
                                //  弹出配置框
                                const modalRef = this.modalService.open(FormModalComponent);
                                modalRef.componentInstance.title = '提交审核';
                                modalRef.componentInstance.hint = '多个标签用空格分隔';
                                modalRef.componentInstance.keyValues = [
                                    {
                                        index: 0,
                                        key: '默认页面配置',
                                        type: 'dropdown',
                                        value: '请选择页面',
                                        src: this.pageList,
                                        categoryId: 0
                                    },
                                    {
                                        index: 1,
                                        key: '标签',
                                        type: 'text',
                                        src: ''
                                    },
                                    {
                                        index: 2,
                                        key: '一级类目',
                                        type: 'dropdown',
                                        value: '请选择类目',
                                        src: this.firstClass,
                                        categoryId: 0
                                    },
                                    {
                                        index: 3,
                                        key: '二级类目',
                                        type: 'dropdown',
                                        value: '请选择类目',
                                        src: this.secondClass,
                                        categoryId: 0
                                    },
                                    {
                                        index: 4,
                                        key: '标题',
                                        type: 'text',
                                        src: ''
                                    }
                                ];
                                modalRef.componentInstance.submitBtnText = '提交';
                                modalRef.componentInstance.submitEvt.subscribe(evt => {
                                    console.log(evt);
                                    this.backbone.submitAudit(
                                        this.backbone.session,
                                        this.backbone.authorizerMiniProgramAppId,
                                        [{
                                            address: evt[0].value,
                                            tag: evt[1].src,
                                            first_class: evt[2].value,
                                            second_class: evt[3].value,
                                            first_id: evt[2].categoryId,
                                            second_id: evt[3].categoryId,
                                            title: evt[4].src
                                        }],
                                        template.templateid
                                    )
                                        .subscribe(audit => {
                                            console.log(audit);
                                            this.showErrorMessage(audit, '提交审核成功');
                                        });
                                });
                            }
                        });
                }
            });
    }

    /**
     *      查询审核结果
     */
    queryAudit(template) {
        this.backbone.queryAudit(
            this.backbone.session,
            this.backbone.authorizerMiniProgramAppId,
            template.auditid)
            .subscribe(status => {
                console.log(status);
                this.showErrorMessage(status, '查询成功');
                // this.audit = this.audit.map(item => {
                //     if (item.auditid === status.auditid) {
                //         item.status = status.status;
                //         item.reason = status.reason;
                //     }
                //     return item;
                // });
            });
    }

    /**
     *      撤消审核
     */
    undoCodeAudit(template) {
        this.backbone.undoCodeAudit(
            this.backbone.session,
            this.backbone.authorizerMiniProgramAppId,
            template.templateid
            // 4
        )
            .subscribe(undo => {
                console.log(undo);
                this.showErrorMessage(undo, '撤消审核成功');
            });
    }

    /**
     *      发布版本
     */
    releaseVersion(template) {
        this.backbone.releaseVersion(
            this.backbone.session,
            this.backbone.authorizerMiniProgramAppId,
            template.templateid
            // 4
        )
            .subscribe(release => {
                console.log(release);
                this.showErrorMessage(release, '发布成功');
            });
    }

    showErrorMessage(result, successMessage) {
        if (result.hasOwnProperty('errcode')) {
            switch (result.errcode) {
                case 0:
                    this.errorMessage = successMessage;
                    this.versions();
                    break;
                case 86000:
                    this.errorMessage = '不是由第三方代小程序进行调用';
                    break;
                case 86001:
                    this.errorMessage = '不存在第三方的已经提交的代码';
                    break;
                case 85006:
                    this.errorMessage = '标签格式错误';
                    break;
                case 85007:
                    this.errorMessage = '页面路径错误';
                    break;
                case 85008:
                    this.errorMessage = '类目填写错误';
                    break;
                case 85009:
                    this.errorMessage = '已经有正在审核的版本';
                    break;
                case 85010:
                    this.errorMessage = 'item_list有项目为空';
                    break;
                case 85011:
                    this.errorMessage = '标题填写错误';
                    break;
                case 85023:
                    this.errorMessage = '审核列表填写的项目数不在1-5以内';
                    break;
                case 85077:
                    this.errorMessage = '小程序类目信息失效（类目中含有官方下架的类目，请重新选择类目）';
                    break;
                case 86002:
                    this.errorMessage = '小程序还未设置昵称、头像、简介。请先设置完后再重新提交';
                    break;
                case 85085:
                    this.errorMessage = '近7天提交审核的小程序数量过多，请耐心等待审核完毕后再次提交';
                    break;
                case 85086:
                    this.errorMessage = '提交代码审核之前需提前上传代码';
                    break;
                case 87013:
                    this.errorMessage = '撤回次数达到上限（每天一次，每个月10次）';
                    break;
                case 85019:
                    this.errorMessage = '没有审核版本';
                    break;
                case 85020:
                    this.errorMessage = '审核状态未满足发布';
                    break;
                case -1:
                    this.errorMessage = '系统繁忙';
                    break;
                default:
                    this.errorMessage = result.errmsg;
                    break;
            }
        } else if (result.hasOwnProperty('code')) {
            if (result.code === 0) {
                this.errorMessage = successMessage;
                this.versions();
            } else {
                this.errorMessage = result.msg;
            }
        } else {
            this.errorMessage = '未知错误';
        }
    }

}
