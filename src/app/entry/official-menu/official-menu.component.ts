import {Component, OnInit} from '@angular/core';
import {Menu, MenuType} from '../../services/diandi.structure';
import {Utils} from '../../services/utils';

@Component({
    selector: 'app-official-menu',
    templateUrl: './official-menu.component.html',
    styleUrls: ['./official-menu.component.less']
})
export class OfficialMenuComponent implements OnInit {
    public errorMessage = '';
    public menuTypeGroup = [];
    public mainMenus = [];

    constructor() {
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

    }
}
