import {Component} from '@angular/core';
import {ContainerService} from './services/container.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor(private container: ContainerService) {
        this.container.set({
            session: 'oRKfQ0wn5FvfGsQi6BkperbYPEA5Dp3l'
        });
    }
}
