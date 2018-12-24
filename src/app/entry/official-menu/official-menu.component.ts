import {Component, OnInit} from '@angular/core';
import {Menu, MenuType} from '../../services/diandi.structure';
import {Utils} from '../../services/utils';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-official-menu',
    templateUrl: './official-menu.component.html',
    styleUrls: ['./official-menu.component.less']
})
export class OfficialMenuComponent implements OnInit {
    public errorMessage = '';
    public menuTypeGroup = [];
    public mainMenus = [];

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {
        for (const index in MenuType) {
            if (MenuType.hasOwnProperty(index)) {
                this.menuTypeGroup.push({
                    index: index,
                    key: MenuType[index].key,
                    value: MenuType[index].value,
                    hint: MenuType[index].hint
                });
            }
        }
        this.AddMainMenu();
    }

    /**
     * 选择菜单类型
     * @param index
     * @param outterId
     * @param innerId
     */
    chooseMenuType(index, outterId, innerId) {
        for (let i = 0; i < this.mainMenus.length; i++) {
            if (this.mainMenus[i].id === outterId) {
                for (let j = 0; j < this.mainMenus[i].subMenus.length; j++) {
                    if (this.mainMenus[i].subMenus[j].id === innerId) {
                        this.mainMenus[i].subMenus[j].type = this.menuTypeGroup[index].key;
                        this.mainMenus[i].subMenus[j].typeName = this.menuTypeGroup[index].value;
                        this.mainMenus[i].subMenus[j].typeHint = this.menuTypeGroup[index].hint;
                        break;
                    }
                }
                break;
            }
        }
    }

    /**
     * 新建菜单项
     * @returns {Menu}
     */
    createNewMenu() {
        return new Menu(
            Utils.GetNonceStr(16),
            false,
            this.menuTypeGroup[0].key,
            this.menuTypeGroup[0].value,
            this.menuTypeGroup[0].hint,
            '',
            'http://mp.weixin.qq.com',
            '',
            '',
            '',
            '');
    }

    createMenuItemJson(menu) {
        let item: any;

        switch (menu.type) {
            case 'miniprogram':
                item = {
                    type: menu.type,
                    name: menu.name,
                    url: menu.url,
                    appid: menu.appid,
                    pagepath: menu.pagePath
                };
                break;
            case 'click':
                item = {
                    type: menu.type,
                    name: menu.name,
                    key: menu.key
                };
                break;
            case 'view':
                item = {
                    type: menu.type,
                    name: menu.name,
                    url: menu.url
                };
                break;
            case 'scancode_push':
            case 'scancode_waitmsg':
            case 'pic_sysphoto':
            case 'pic_photo_or_album':
            case 'pic_weixin':
                item = {
                    type: menu.type,
                    name: menu.name,
                    key: menu.key,
                    sub_button: []
                };
                break;
            case 'location_select':
                item = {
                    type: menu.type,
                    name: menu.name,
                    key: menu.key
                };
                break;
            case 'media_id':
            case 'view_limited':
                item = {
                    type: menu.type,
                    name: menu.name,
                    media_id: menu.mediaId
                };
                break;
            default:
                break;
        }

        return item;
    }

    /**
     * 创建菜单项
     */
    AddMainMenu() {
        if (this.mainMenus.length < 3) {
            this.mainMenus.push({
                id: Utils.GetNonceStr(16),
                name: '',
                subMenus: []
            });
            const menu = this.createNewMenu();
            this.mainMenus[this.mainMenus.length - 1].subMenus.push(menu);
        } else {
            this.errorMessage = '最多添加三个一级菜单';
        }
    }

    /**
     * 创建子菜单
     * @param id
     * @constructor
     */
    AddSubMenu(id) {
        for (let i = 0; i < this.mainMenus.length; i++) {
            if (this.mainMenus[i].id === id) {
                if (this.mainMenus[i].subMenus.length < 5) {
                    const menu = this.createNewMenu();
                    this.mainMenus[i].subMenus.push(menu);
                } else {
                    this.errorMessage = '最多添加五个二级菜单';
                }
                break;
            }
        }
    }

    /**
     * 移除子菜单
     * @param outterId
     * @param innerId
     * @constructor
     */
    RemoveSubMenu(outterId, innerId) {
        for (let i = 0; i < this.mainMenus.length; i++) {
            if (this.mainMenus[i].id === outterId) {
                for (let j = 0; j < this.mainMenus[i].subMenus.length; j++) {
                    if (this.mainMenus[i].subMenus[j].id === innerId) {
                        this.mainMenus[i].subMenus.splice(j, 1);
                        break;
                    }
                }
                break;
            }
        }

    }

    convertMenuToJson() {
        const menu = {
            button: []
        };

        this.mainMenus.map(item => {
            console.log(item);
            if (item.subMenus.length === 1) {
                menu.button.push(this.createMenuItemJson(item.subMenus[0]));
            } else if (item.subMenus.length > 1) {
                const menuItem = {
                    name: item.name,
                    sub_button: []
                };
                item.subMenus.map(sub => {
                    menuItem.sub_button.push(this.createMenuItemJson(sub));
                });
                menu.button.push(menuItem);
            }
        });

        console.log(menu);

        this.backbone.createMenu(
            this.backbone.publicEncrypt(''),
            this.backbone.authorizerAppId,
            menu
        ).subscribe(result => {
            console.log(result);
        });
    }
}
