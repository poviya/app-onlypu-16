import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuSidebar, User, UserCredit } from 'src/app/interfaces';
import { ModalService } from 'src/app/library/modal';
import { AuthService, ToolsService, UserCreditService } from 'src/app/services';
import { SearchService } from '../../search/search.service';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isBrowser: boolean;
  isServer: boolean;

  public getScreenWidth: any;
  public getScreenHeight: any;

  openMobil: boolean = false;
  openSidebar: boolean = true;
  menuSidebar: MenuSidebar[];
  menuSidebarModal: MenuSidebar[];

  countryCurrentIso: string | null;

  //userCreditData: UserCredit;

  // menuSidebar = [
  //   {
  //     link_name: "Dashboard",
  //     link: "/panel/dashboard",
  //     icon: "bx bx-grid-alt",
  //     sub_menu: []
  //   }, {
  //     link_name: "Category",
  //     link: null,
  //     icon: "bx bx-collection",
  //     sub_menu: [
  //       {
  //         link_name: "HTML & CSS",
  //         link: "/panel/html-n-css",
  //       }, {
  //         link_name: "JavaScript",
  //         link: "/javascript",
  //       }, {
  //         link_name: "PHP & MySQL",
  //         link: "/php-n-mysql",
  //       }
  //     ]
  //   }, {
  //     link_name: "Posts",
  //     link: null,
  //     icon: "bx bx-book-alt",
  //     sub_menu: [
  //       {
  //         link_name: "Web Design",
  //         link: "/posts/web-design",
  //       }, {
  //         link_name: "Login Form",
  //         link: "/posts/login-form",
  //       }, {
  //         link_name: "Card Design",
  //         link: "/posts/card-design",
  //       }
  //     ]
  //   }, {
  //     link_name: "Analytics",
  //     link: "/analytics",
  //     icon: "bx bx-pie-chart-alt-2",
  //     sub_menu: []
  //   }, {
  //     link_name: "Chart",
  //     link: "/chart",
  //     icon: "bx bx-line-chart",
  //     sub_menu: []
  //   }, {
  //     link_name: "Plugins",
  //     link: null,
  //     icon: "bx bx-plug",
  //     sub_menu: [
  //       {
  //         link_name: "UI Face",
  //         link: "/ui-face",
  //       }, {
  //         link_name: "Pigments",
  //         link: "/pigments",
  //       }, {
  //         link_name: "Box Icons",
  //         link: "/box-icons",
  //       }
  //     ]
  //   }, {
  //     link_name: "Explore",
  //     link: "/explore",
  //     icon: "bx bx-compass",
  //     sub_menu: []
  //   }, {
  //     link_name: "History",
  //     link: "/history",
  //     icon: "bx bx-history",
  //     sub_menu: []
  //   }, {
  //     link_name: "Setting",
  //     link: "/setting",
  //     icon: "bx bx-cog",
  //     sub_menu: []
  //   }
  // ]

  userCreditData: UserCredit;

  constructor(
    public authService: AuthService,
    private searchService: SearchService,
    private dialogService: DialogService,
    private toolsService: ToolsService,
    public router: Router,
    private userCreditService: UserCreditService,
    @Inject(PLATFORM_ID) private platformId: object,) {

    if (this.toolsService.countryCurrent || this.toolsService.countryCurrent != null) {
      this.countryCurrentIso = `/${this.toolsService.countryCurrent}`;
    } else {
      this.countryCurrentIso = '/';
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    };

    this.onMenu();
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.onWindowResize();

    if (this.authService.user) {
      //this.userCredit();
    }
  }

  async userCredit() {
    try {
      this.userCreditData = await this.userCreditService.getUserCreditCurrentLocal();
    } catch (error) {
      console.error(error);
    }  
  }

  get modalMenuSiber() {
    return this.dialogService.modalMenuSiber;
  }

  closeModalMenuSiber() {
    this.dialogService.toogleMenuSiber();
  }

  async onMenuSiberDialog() {
    
    this.dialogService.toogleMenuSiber();
    //this.userCreditData = await this.userCreditService.getUserCreditCurrentLocal();
  }

  onMenu0(): void {
    if (this.authService.user) {
      this.menuSidebar = [

        {
          link_name: "home",
          link: `${this.countryCurrentIso}`,
          icon: "home",
          sub_menu: []
        },

        {
          link_name: "videocam",
          link: "/videocam",
          icon: "voice_chat",
          sub_menu: []
        },

        {
          link_name: "bookmarks",
          link: "/panel/bookmarks",
          icon: "bookmarks",
          sub_menu: []
        },
        {
          link_name: "suscriptions",
          link: "/my/subscribers",
          icon: "face_4",
          sub_menu: []
        },

        {
          link_name: "profile",
          link: `/${this.authService.user.username}`,
          icon: "face",
          sub_menu: []
        },

      ];

      this.menuSidebarModal = [
        {
          link_name: "profile",
          link: `/${this.authService.user.username}`,
          icon: "face",
          sub_menu: []
        },
        {
          link_name: "bookmarks",
          link: "/panel/bookmarks",
          icon: "bookmarks",
          sub_menu: []
        },
        {
          link_name: "incomes",
          link: "/panel/incomes",
          icon: "account_balance",
          sub_menu: []
        },
        {
          link_name: "payments",
          link: "/panel/payments",
          icon: "payments",
          sub_menu: []
        },
        {
          link_name: "withdrawal_of_money",
          link: "/panel/withdrawal-money",
          icon: "currency_exchange",
          sub_menu: []
        },
        {
          link_name: "setting",
          link: "/panel/setting",
          icon: "settings",
          sub_menu: []
        },
      ]
    } else {

      this.menuSidebar = [
        {
          link_name: "home",
          link: `/`,
          icon: "home",
          sub_menu: []
        },
        {
          link_name: "videocam",
          link: "/videocam",
          icon: "voice_chat",
          sub_menu: []
        },

        {
          link_name: "bookmarks",
          link: "/panel/bookmarks",
          icon: "bookmarks",
          sub_menu: []
        },
        {
          link_name: "suscriptions",
          link: "/my/subscribers",
          icon: "face_4",
          sub_menu: []
        },
      ];

    }
  }

  onMenu(): void {
    if (this.authService.user) {
      this.menuSidebar = [
        // {
        //   link_name: "Home",
        //   link: "/bo",
        //   icon: "home",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Countries",
        //   link: "/countries",
        //   icon: "public",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Posts",
        //   link: "/posts",
        //   icon: "movie",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Home",
        //   link: "/home",
        //   icon: "home",
        //   sub_menu: []
        // },

        // {
        //   link_name: "Discover",
        //   link: "/discover",
        //   icon: "explore",
        //   sub_menu: []
        // },

        // {
        //   link_name: "Dating",
        //   link: "/bo",
        //   icon: "whatshot",
        //   sub_menu: []
        // },


        {
          link_name: "home",
          link: `${this.countryCurrentIso}`,
          icon: "home",
          sub_menu: []
        },
        {
          link_name: "countries",
          link: "/",
          icon: "public",
          sub_menu: []
        },
        {
          link_name: "feed",
          link: "/feed",
          icon: "movie",
          sub_menu: []
        },

        {
          link_name: "videocam",
          link: "/videocam",
          icon: "voice_chat",
          sub_menu: []
        },

        {
          link_name: "bookmarks",
          link: "/panel/bookmarks",
          icon: "bookmarks",
          sub_menu: []
        },
        {
          link_name: "suscriptions",
          link: "/my/subscribers",
          icon: "face_4",
          sub_menu: []
        },
        // {
        //   link_name: "Subscribers",
        //   link: "/panel/subscribers",
        //   icon: "face_5",
        //   sub_menu: []
        // },
        // {
        //   link_name: "My Dating",
        //   link: "/panel/chats",
        //   icon: "fireplace",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Chats",
        //   link: "/chat/users",
        //   icon: "chat",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Incomes",
        //   link: "/panel/incomes",
        //   icon: "paid",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Payments",
        //   link: "/panel/payments",
        //   icon: "payments",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Retiro de fondos",
        //   link: "/panel/chats",
        //   icon: "attach_money",
        //   sub_menu: []
        // } 
        {
          link_name: "profile",
          link: `/${this.authService.user.username}`,
          icon: "face",
          sub_menu: []
        },
        // {
        //   link_name: "Setting",
        //   link: "/panel/setting",
        //   icon: "settings",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Mas",
        //   link: null,
        //   icon: "read_more",
        //   sub_menu: [
        //     {
        //       link_name: "HTML & CSS",
        //       link: "/panel/html-n-css",
        //     }, {
        //       link_name: "JavaScript",
        //       link: "/javascript",
        //     }, {
        //       link_name: "PHP & MySQL",
        //       link: "/php-n-mysql",
        //     }
        //   ]
        // }
      ];

      this.menuSidebarModal = [
        {
          link_name: "profile",
          link: `/${this.authService.user.username}`,
          icon: "face",
          sub_menu: []
        },
        {
          link_name: "bookmarks",
          link: "/panel/bookmarks",
          icon: "bookmarks",
          sub_menu: []
        },
        {
          link_name: "my_dating",
          link: "/panel/your-ads",
          icon: "whatshot",
          sub_menu: []
        },
        {
          link_name: "incomes",
          link: "/panel/incomes",
          icon: "account_balance",
          sub_menu: []
        },
        {
          link_name: "payments",
          link: "/panel/payments",
          icon: "payments",
          sub_menu: []
        },
        {
          link_name: "withdrawal_of_money",
          link: "/panel/withdrawal-money",
          icon: "currency_exchange",
          sub_menu: []
        },
        {
          link_name: "setting",
          link: "/panel/setting",
          icon: "settings",
          sub_menu: []
        },
      ]
    } else {

      this.menuSidebar = [
        {
          link_name: "home",
          link: `${this.countryCurrentIso}`,
          icon: "home",
          sub_menu: []
        },
        {
          link_name: "countries",
          link: "/",
          icon: "public",
          sub_menu: []
        },
        {
          link_name: "feed",
          link: "/feed",
          icon: "movie",
          sub_menu: []
        },

        {
          link_name: "videocam",
          link: "/videocam",
          icon: "voice_chat",
          sub_menu: []
        },
        // {
        //   link_name: "Home",
        //   link: "/home",
        //   icon: "home",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Bookmarks",
        //   link: "/panel/bookmarks",
        //   icon: "bookmarks",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Suscriptions",
        //   link: "/my/subscribers",
        //   icon: "face_4",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Subscribers",
        //   link: "/panel/subscribers",
        //   icon: "face_5",
        //   sub_menu: []
        // },
        // {
        //   link_name: "My Dating",
        //   link: "/panel/chats",
        //   icon: "fireplace",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Chats",
        //   link: "/chat/users",
        //   icon: "chat",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Incomes",
        //   link: "/panel/incomes",
        //   icon: "paid",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Payments",
        //   link: "/panel/payments",
        //   icon: "payments",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Retiro de fondos",
        //   link: "/panel/chats",
        //   icon: "attach_money",
        //   sub_menu: []
        // } 
        // {
        //   link_name: "Setting",
        //   link: "/panel/setting",
        //   icon: "settings",
        //   sub_menu: []
        // },
        // {
        //   link_name: "Mas",
        //   link: null,
        //   icon: "read_more",
        //   sub_menu: [
        //     {
        //       link_name: "HTML & CSS",
        //       link: "/panel/html-n-css",
        //     }, {
        //       link_name: "JavaScript",
        //       link: "/javascript",
        //     }, {
        //       link_name: "PHP & MySQL",
        //       link: "/php-n-mysql",
        //     }
        //   ]
        // }
      ];

    }
  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth < 500) {
      this.openMobil = true;
      this.searchService.device(false);
    } else if (this.getScreenWidth < 1100) {
      this.openMobil = false;
      this.openSidebar = false;
      this.searchService.device(false);
    } else {
      this.openMobil = false;
      this.openSidebar = true;
      this.searchService.device(false);
    }
    // console.log('getScreenWidth', this.getScreenWidth);
    // console.log('getScreenHeight', this.getScreenHeight);
  }

  logout() {
    this.dialogService.toogleMenuSiber();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.authService.logout();
  }

  prinImages(images: any) {
    return images[0]['url'];
  };

}
