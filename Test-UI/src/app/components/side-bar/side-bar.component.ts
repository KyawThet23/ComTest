import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  isCollapsed = true;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    const main = document.querySelector('.main-content')
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('collapsed', this.isCollapsed);
    main?.classList.toggle('collapsed',this.isCollapsed);
  }
}
