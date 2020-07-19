import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'recipe-book-and-shopping-list-angular-app';
  loadedFeature: string = 'recipe';

  onNavigate(feature: string) {
    console.log('feature in app.component: ', feature);
    this.loadedFeature = feature;
  }
}
