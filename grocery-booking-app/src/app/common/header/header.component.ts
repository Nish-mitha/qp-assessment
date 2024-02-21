import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() color: string = 'primary';
  @Input() role: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        if(event.url == '/admin') {
          this.color = 'warn';
          this.role = '- Admin'
        }
    
        if(event.url == '/user') {
          this.role = '- User';
          this.color = 'primary';
        }
      }
    });
  }

  navigateToTarget(routeUrl: string) {
    this.router.navigateByUrl(routeUrl);
  }

}
