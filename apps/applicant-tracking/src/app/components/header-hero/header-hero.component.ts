import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-header-hero',
  templateUrl: './header-hero.component.html',
  styleUrls: ['./header-hero.component.css'],
})
export class HeaderHeroComponent {
  @Input() title = '';
  @Input() links: any[] = [];
}
