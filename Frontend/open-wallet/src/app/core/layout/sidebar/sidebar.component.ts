import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

/**
 * PrimeNG Module
 */
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { PanelMenu } from 'primeng/panelmenu';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, DrawerModule, MenuModule, TooltipModule]
})
export class SidebarComponent implements OnInit {

  @ViewChild('drawerRef') drawerRef!: Drawer;

  public items: MenuItem[] = [];

  public visible: boolean = false;
  public expanded: boolean = false;

  public selectedItem: any;

  private user: User;

  constructor(
    private _router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.user = this.userService.currentUser();

    if (this.user?.type === 'ente') {
      this.items = [
        {
          key: '0',
          label: 'Dashboard',
          icon: 'pi pi-chart-pie',
          routerLink: '/home/dashboard'
        },
        {
          key: '1',
          label: 'Certificazioni',
          icon: 'pi pi-verified',
          routerLink: '/home/certificates'
        },
        {
          key: '3',
          label: 'Impostazioni',
          icon: 'pi pi-cog'
        },
        {
          key: '4',
          label: 'Sign out',
          icon: 'pi pi-sign-out',
          routerLink: this.userService.currentUser().type === 'ente' ? '/ente/login' : '/user/login'
        }
      ];
    } else if (this.user?.type === 'user') {
      this.items = [
        {
          key: '0',
          label: 'Dashboard',
          icon: 'pi pi-chart-pie',
          routerLink: '/home/dashboard'
        },
        {
          key: '1',
          label: 'Le mie Certificazioni',
          icon: 'pi pi-verified',
          routerLink: '/home/certificates'
        },
        {
          key: '2',
          label: 'Timeline Accessi',
          icon: 'pi pi-clock',
          routerLink: '/home/access-log'
        routerLink: '/home/logAccess'
      },
      {
        key: '3',
        label: 'Profilo',
          icon: 'pi pi-user',
          routerLink: '/home/profile'
        },
        {
          key: '4',
          label: 'Sign out',
          icon: 'pi pi-sign-out',
          routerLink: this.userService.currentUser().type === 'ente' ? '/ente/login' : '/user/login'
        }
      ];
    }
  }


  toggleAll() {
    this.expanded = !this.areAllItemsExpanded();
    this.items = this.toggleAllRecursive(this.items, this.expanded);
  }

  private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
    return items.map((menuItem) => {
      menuItem.expanded = expanded;
      if (menuItem.items) {
        menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
      }
      return menuItem;
    });
  }

  private areAllItemsExpanded(): boolean {
    return this.items.every((menuItem) => menuItem.expanded);
  }

  close(e: Event): void {
    this.drawerRef.close(e);
  }

  public navigate(link: any) {
    this._router.navigateByUrl(link);
  }

}
