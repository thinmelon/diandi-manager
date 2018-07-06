import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {BackboneService} from './services/diandi.backbone';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    public focusItem: string;

    constructor(private router: Router,
                private backbone: BackboneService) {
        this.focusItem = this.backbone.focusItem ? this.backbone.focusItem : 'order';
    }

    onFocus(name: string) {
        this.backbone.focusItem = this.focusItem = name;
        this.router.navigate(['/list/' + name]);
    }
}
