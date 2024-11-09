import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';

import { BreakpointObserver } from '@angular/cdk/layout';

import { Router } from '@angular/router';

import { BusyService } from 'src/app/services/busy.service';

import { OtherService } from 'src/app/services/other.service';

import { AccountService } from 'src/app/services/account.service';

import { DeviceDetectorService } from 'ngx-device-detector';

import { ToastrService } from 'ngx-toastr';

import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({

  selector: 'app-landing-page',

  templateUrl: './landing-page.component.html',

  styleUrls: ['./landing-page.component.css'],

  animations: [

    trigger('slideInOut', [

      state('open', style({

        height: '*',

        overflow: 'hidden',

        opacity: '1',

        margin: '10px 0'

      })),

      state('closed', style({

        height: '0',

        overflow: 'hidden',

        opacity: '0',

      })),

      transition('open <=> closed', [

        animate('0.3s ease-in-out')

      ])

    ])

  ]

})

export class LandingPageComponent implements OnInit {

  user: any = {};

  userImage: any;

  isDesktop: any;

  istablet: any;

  version: string = (<any>window).version;

  onlineHelp: any;

  showSubMenue: boolean = false;

  showSubMenue1: boolean = false;

  showSubMenue2: boolean = false;

  showSubMenue3: boolean = false;

  showSubMenue4: boolean = false;

  showSubMenue5: boolean = false;

  showSubMenue6: boolean = false;

  showSubMenue7: boolean = false;

  showSubMenue8: boolean = false;

  showSubMenue8_1: boolean = false;

  showSubMenue9: boolean = false;

  showSubMenue10: boolean = false;

  showSubMenue11: boolean = false;

  showSubMenue12: boolean = false;

  showSubMenue13: boolean = false;

  urlRoute: any;

  ability: any = {};

  apptitle = (<any>window).App_Title;

  helpData: any = [];

  proSearchPer: boolean = true

  proGeneralInfoPer: boolean = true

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router, public loaderService: BusyService,

    private otherService: OtherService,

    private el: ElementRef,

    private accountService: AccountService,

    private deviceService: DeviceDetectorService,

    private toastr: ToastrService,

    private dialog: MatDialog,

    private cdr: ChangeDetectorRef) {

    const navigation = this.router.getCurrentNavigation();

    this.urlRoute = this.router;

  }

  ngOnInit(): void {

    var retrievedObject = this.accountService.decrypt(localStorage.getItem('85b83936a00d52d107d1257ab8d74ef8'));

    let x = JSON.parse(retrievedObject)

    this.proSearchPer = x.bProSearch

    this.proGeneralInfoPer = x.bGeneralInfo

    this.user = this.otherService.getLocalStorage();

    this.isDesktop = this.deviceService.isDesktop();

    this.istablet = this.deviceService.isTablet();

    setTimeout(() => {

      // this.apptitle = this.accountService.decrypt(localStorage.getItem("98caa670ad816b5635981ff2f0819cf8"));

      this.ability = this.otherService.getAbility();

    }, 700);


    if (this.user.Img) this.user.Img = "data:image/png;base64," + this.user.Img;

  }

  logOut() {

    Swal.fire({

      title: "آیا از خروج حساب کاربری خود اطمینان دارید؟",

      icon: 'warning',

      iconHtml: '?',

      showCancelButton: true,

      showConfirmButton: true,

      reverseButtons: true,

      confirmButtonColor: '#10b981',

      cancelButtonColor: '#EF4444',

      confirmButtonText: 'تایید',

      cancelButtonText: 'لغو',

    }).then((result) => {

      if (result.isConfirmed) this.otherService.logOut();

    })


  }

  closeNav() {

    if (!this.isDesktop && !this.istablet) this.sidenav.opened = false;
  }

  ngAfterViewInit() {

    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {

      if (res.matches) {

        this.sidenav.mode = 'over';

        this.sidenav.close();

      } else {

        this.sidenav.mode = 'side';

        this.sidenav.open();

      }

    });

  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }




  changeRoute(url, access) {

    if (access == false) return this.toastr.error("شما مجوز ورود به این صفحه را ندارید");

    this.router.navigate([`${url}`]);

  }


  accessibility(...array: boolean[]): boolean {

    let result = false;

    for (let i = 0; i < array.length; i++) {

      if (array[i] == true && !result) {

        result = true;

        break;

      }

    }

    return result;

  }

}
