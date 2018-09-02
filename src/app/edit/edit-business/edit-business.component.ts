import {Component, OnInit} from '@angular/core';
import {Business, BusinessType} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';
import * as moment from 'moment';
import {Router} from '@angular/router';

declare var qq: any;
const center = new qq.maps.LatLng(25.43131, 119.01501);   //  地图中心坐标
const zoom = 17;        //  放大级别

@Component({
    selector: 'app-edit-business',
    templateUrl: './edit-business.component.html',
    styleUrls: ['./edit-business.component.less']
})
export class EditBusinessComponent implements OnInit {
    public map;
    public businessTypeHint = '请选择商户类型';
    public businessTypeGroup = [];
    public business: Business;
    public products = [];
    public materials = [];
    public associatedMaterial = null;
    // public curProductPage = 1;
    // public curProductOffset = 0;
    public curMaterialPage = 1;
    public curMaterialOffset = 0;
    public itemsPerPage = 5;
    public errorMessage = '';

    constructor(private router: Router,
                private backbone: BackboneService) {
        this.business = new Business('', 0, '', '', 0, 0, '', '', '', '', '', '');
    }

    ngOnInit() {
        console.log(this.backbone.businessId);
        if ('' !== this.backbone.businessId) {
            this.backbone
                .fetchBusinessDetail(this.backbone.session, this.backbone.businessId)
                .subscribe(result => {
                    console.log(result);
                    if (result.code === 0) {
                        this.business.bid = result.msg.business[0].bid;
                        this.business.type = result.msg.business[0].type;
                        this.businessTypeHint = BusinessType[this.business.type];
                        this.business.name = result.msg.business[0].name;
                        this.business.address = result.msg.business[0].address;
                        this.business.longitude = result.msg.business[0].longitude;
                        this.business.latitude = result.msg.business[0].latitude;
                        this.business.shopHours = result.msg.business[0].shopHours;
                        this.business.phone = result.msg.business[0].phone;
                        this.business.consumptionPerPerson = result.msg.business[0].consumptionPerPerson;
                        this.business.remark = result.msg.business[0].remark;
                        // if (result.msg.product.length > 0) {
                        //     this.business.associatedProductPid = result.msg.product[0].productId;
                        // }
                        if (result.msg.material.length > 0) {
                            this.business.associatedMaterialId = result.msg.material[0].mediaId;
                        }
                        console.log(this.business);
                    }
                });
        }

        for (const key in BusinessType) {
            if (BusinessType.hasOwnProperty(key)) {
                this.businessTypeGroup.push({
                    index: key,
                    name: BusinessType[key]
                });
            }
        }
        /**
         * 定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
         */
        this.map = new qq.maps.Map(
            window.document.getElementById('tencent-map'),
            {
                center: center,             // 地图的中心地理坐标
                zoom: zoom                  // 地图的中心地理坐标
            });

        // this.fetchProductList();
        this.fetchMaterialList();
    }

    /**
     * 选择商户类型
     * @param name
     * @param value
     */
    chooseBusinessType(name, value) {
        this.businessTypeHint = name;
        this.business.type = value;
    }

    /**
     * 选择要关联的商品
     * @param pid
     */
    // chooseProduct(pid) {
    //     this.business.associatedProductPid = pid;
    // }

    /**
     * 选择要关联的软文
     * @param material
     */
    chooseMaterial(material) {
        this.business.associatedMaterialId = material.media_id;
        this.associatedMaterial = material.content;
    }

    /**
     * 获取商品列表
     */
    // fetchProductList() {
    //     this.backbone
    //         .fetchPartialProducts(
    //             this.backbone.session, this.curProductOffset, this.itemsPerPage)
    //         .subscribe(response => {
    //             console.log(response);
    //             if (response.code === 0) {
    //                 this.products = response.msg.map(item => {
    //                     item.name = decodeURIComponent(item.name);
    //                     return item;
    //                 });
    //             }
    //         });
    // }

    /**
     * 转页 -- 商品
     * @param direction
     */
    // turnProductPage(direction) {
    //     if (direction < 0) {
    //         if (this.curProductPage > 1) {
    //             this.curProductPage = this.curProductPage + direction;
    //             this.curProductOffset = (this.curProductPage - 1) * this.itemsPerPage;
    //             this.fetchProductList();
    //         }
    //     } else {
    //         this.curProductPage = this.curProductPage + direction;
    //         this.curProductOffset = (this.curProductPage - 1) * this.itemsPerPage;
    //         this.fetchProductList();
    //     }
    // }

    /**
     * 获取软文列表
     */
    fetchMaterialList() {
        this.backbone
            .fetchOfficialAccountMaterialList(this.curMaterialOffset, this.itemsPerPage)
            .subscribe(response => {
                console.log(response);
                this.materials = response.map(item => {
                    item.content.create_time = moment(item.content.create_time * 1000).format('YYYY-MM-DD hh:mm:ss');
                    item.content.update_time = moment(item.content.update_time * 1000).format('YYYY-MM-DD hh:mm:ss');
                    return item;
                });
            });
    }

    /**
     * 转页 -- 软文
     * @param direction
     */
    turnMaterialPage(direction) {
        if (direction < 0) {
            if (this.curMaterialPage > 1) {
                this.curMaterialPage = this.curMaterialPage + direction;
                this.curMaterialOffset = (this.curMaterialPage - 1) * this.itemsPerPage;
                this.fetchMaterialList();
            }
        } else {
            this.curMaterialPage = this.curMaterialPage + direction;
            this.curMaterialOffset = (this.curMaterialPage - 1) * this.itemsPerPage;
            this.fetchMaterialList();
        }
    }

    /**
     * 根据输入的地址信息，获取商户的经纬度坐标
     * @param e
     */
    getCoordinates() {
        const that = this;
        /**
         * 地址解析 Geocoder
         * 地址解析类用于在地址和经纬度之间进行转换的服务。 本功能以异步方式将检索条件发送至服务器
         * 通过您自定义的回调函数将结果返回
         */
        const geocoder = new qq.maps.Geocoder({
            complete: function (result) {
                console.log(result);
                that.business.latitude = result.detail.location.lat;
                that.business.longitude = result.detail.location.lng;
                that.map.setCenter(result.detail.location);
                const marker = new qq.maps.Marker({
                    map: that.map,
                    position: result.detail.location
                });
            }
        });
        geocoder.getLocation(this.business.address);
    }

    /**
     * 添加商户
     */
    onSubmit() {
        console.log(this.business);
        console.log(this.backbone.businessId);
        this.errorMessage = '';
        if (!this.business.longitude || !this.business.latitude) {
            this.errorMessage = '请点击按键获取商户地址的经纬度';
            return;
        }
        if (this.backbone.businessId === '') {
            this.backbone
                .addBusiness(this.backbone.session, this.backbone.authorizerMiniProgramAppId, this.business)
                .subscribe(response => {
                    console.log(response);
                    if (response.code === 0) {
                        this.router.navigate(['/entry/wechat/miniprogram/business']);
                    }
                });
        } else {
            this.backbone
                .updateBusiness(this.backbone.session, this.business)
                .subscribe(response => {
                    console.log(response);
                    if (response.code === 0) {
                        this.router.navigate(['/entry/wechat/miniprogram/business']);
                    }
                });
        }

    }

}
