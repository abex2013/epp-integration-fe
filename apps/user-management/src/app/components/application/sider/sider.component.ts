import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, provideRoutes } from '@angular/router';

interface RouteLinks {
  name: string;
  link: string;
}

@Component({
  selector: 'exec-epp-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css'],
})
export class SiderComponent implements OnInit {
  route = '';


  checker1: any = false;
  counter: any = 1;

  //user = this.accountService.userInfo;

  activePath(routePath: string) {
    if (this.route === '') this.route = this.router.url;
    return this.route == routePath;
  }

  constructor(private router: Router){}

  ngOnInit(): void {
  }
}
