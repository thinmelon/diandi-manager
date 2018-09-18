import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ENUM_SCENARIO, Precondition, Template} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-scenario-intro',
    templateUrl: './scenario-intro.component.html',
    styleUrls: ['./scenario-intro.component.less']
})
export class ScenarioIntroComponent implements OnInit {
    errorMessage = '';
    linkName = '';
    link = '';
    precondition: Precondition;
    btnName = '--- 请选择商户 ---';
    businesses = [];
    appliedTemplate = null;              //  应用模版

    constructor(private route: ActivatedRoute,
                private router: Router,
                private backbone: BackboneService) {
        this.route.params.subscribe(params => {
            this.precondition = JSON.parse(params.precondition);
        });
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { templateListResolver: any }) => {
                console.log(data.templateListResolver);
                if (data.templateListResolver.errcode === 0) {
                    data.templateListResolver.template_list.map(item => {
                        // 判断场景值，根据开发源的appid，确定相应的小程序模版
                        if (item.source_miniprogram_appid === 'wxdca47cfe34b88cad'
                            && this.precondition.scenario === ENUM_SCENARIO.COMMERCE) {
                            this.appliedTemplate = item;
                        } else if (item.source_miniprogram_appid === 'wx54710fd1373c1ce8'
                            && this.precondition.scenario === ENUM_SCENARIO.MAP) {
                            this.appliedTemplate = item;
                        }
                        return item;
                    });
                }
            });
        //  应用场景前是否需要创建店铺
        if (this.precondition.shouldHavaBusiness
        ) {
            this.backbone
                .fetchBusinessList(this.backbone.session, this.backbone.authorizerMiniProgramAppId)
                .subscribe(res => {
                    console.log(res);
                    if (res.code === 0 && res.msg.length > 0) {
                        this.businesses = res.msg;
                        this.onBusinessSelected(res.msg[0]);
                    } else {
                        this.errorMessage = '请先创建店铺后，再应用该模版';
                        this.linkName = '创建店铺';
                        this.link = 'entry/wechat/miniprogram/business';
                    }
                });
        }
    }

    /**
     * 选择一个店铺
     * @param business
     */
    onBusinessSelected(business) {
        this.backbone.businessId = business.bid;
        this.btnName = business.name;
    }

    /**
     *  应用模版
     */
    apply() {
        //  上传代码
        this.backbone.commitSourceCode(
            this.backbone.session,
            this.backbone.authorizerMiniProgramAppId,
            new Template(
                this.appliedTemplate.template_id,
                JSON.stringify({
                    extEnable: true,
                    extAppid: this.backbone.authorizerMiniProgramAppId,
                    ext: {
                        appid: this.backbone.authorizerMiniProgramAppId,
                        businessid: this.backbone.businessId || ''
                    }
                }),
                this.appliedTemplate.user_version,
                this.appliedTemplate.user_desc
            ))
            .subscribe(result => {
                console.log(result);
                if (result.code === 0) {
                    this.router.navigate(['entry/wechat/miniprogram/template']);    //  成功使用模版后跳转至版本管理
                } else if (result.code === -100) {
                    this.errorMessage = '当前小程序已应用该模版，请进入版本管理查看详情';
                    this.linkName = '版本管理';
                    this.link = 'entry/wechat/miniprogram/template';
                }
            });
    }
}
