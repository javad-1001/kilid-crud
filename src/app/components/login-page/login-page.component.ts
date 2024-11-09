import { Component, Inject, OnInit } from '@angular/core';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { NavigationExtras, Router } from '@angular/router';

import { SwUpdate } from '@angular/service-worker';

import { DeviceDetectorService } from 'ngx-device-detector';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from 'src/app/services/account.service';

import { BusyService } from 'src/app/services/busy.service';

import { OtherService } from 'src/app/services/other.service';

@Component({

  selector: 'app-login-page',

  templateUrl: './login-page.component.html',

  styleUrls: ['./login-page.component.css']

})

export class LoginPageComponent implements OnInit {

  model: any = {};

  codeSent: boolean;

  version: string = '';

  isDesktop: any;

  inpType: string = "password";

  apptitle: string = (<any>window).App_Title;

  constructor(

    private accountService: AccountService,

    private toastr: ToastrService,

    private router: Router,

    public loaderService: BusyService,

    private deviceService: DeviceDetectorService,

    private otherService: OtherService,

    private swUpdate: SwUpdate, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.isDesktop = this.deviceService.isDesktop();
    this.loaderService.isLoading.next(false);
    let hp = this.accountService.decrypt(localStorage.getItem('db30a17f18d1a8ca3ed63430f48b0b02'));
    this.version = (<any>window).version;
    if (hp) this.model.strMobile = hp;
    var strMobile = this.accountService.decrypt(localStorage.getItem("db30a17f18d1a8ca3ed63430f48b0b02"));
    var strPassword = this.accountService.decrypt(localStorage.getItem('64d293a2fcc7f34b4e12cd96b90e3b7d'));
    if (strMobile) {
      this.model.strMobile = strMobile
      this.model.strPassword = strPassword;
      this.login();
    }
  }

  login() {

    try {
      this.accountService.login(this.model).subscribe(response => {

        let res = JSON.stringify(response);

        let resParse = JSON.parse(res);

        switch (resParse.iResult) {

          case 1: this.accountService.toastSwal('success', "به دیــار خوش آمدید");

            localStorage.setItem('db30a17f18d1a8ca3ed63430f48b0b02', this.accountService.encrypt(this.model.strMobile));

            localStorage.setItem('64d293a2fcc7f34b4e12cd96b90e3b7d', this.accountService.encrypt(this.model.strPassword));

            // localStorage.setItem('98caa670ad816b5635981ff2f0819cf8', this.accountService.encrypt(resParse.strAppName));

            var location = { fLat: resParse.fLat, fLon: resParse.fLon };

            localStorage.setItem('355b37d7d3c0727d2f860b1a2aeca1ba', this.accountService.encrypt(JSON.stringify(location)));

            // (<any>window).App_Title = this.model.strAppName;

            var state = {

              Img: resParse.strProfileImage,

              hpnumber: this.model.hpnumber,

              name: resParse.strFullName,

              role: resParse.strRoleName,

              region: resParse.strCityName,

              iOrganizationalRole: resParse.iOrganizationalRole,

              iOrganizationalUser: resParse.iOrganizationalUser,

              strCityCode: resParse.strCityCode,

              strState: resParse.strState,

              strVillageCode: resParse.strVillageCode,

              strSession: resParse.strSession

            }

            this.accountService.GetUserAbility(response).subscribe(response2 => {

              window.localStorage.setItem("85b83936a00d52d107d1257ab8d74ef8", this.accountService.encrypt(JSON.stringify(response2)));

              window.localStorage.setItem("619afcac863ef1d3c971f2f41956d0b4", this.accountService.encrypt(JSON.stringify(state)));

              this.router.navigateByUrl('/dyar')

            })

            break;
          case 0: this.toastr.error("اطلاعات وارد شده صحیح نمی باشد")
            break;
          case -2: this.toastr.error("کاربری با این مشخصات وجود ندارد");
            break;
          case -3: this.toastr.warning("حساب کاربری شما غیر فعال شده است، با مدیر سامانه تماس بگیرید");
            break;
          case -4: this.toastr.warning("کد اعتبارسنجی برای شما ارسال شد");
            this.codeSent = true;
          default:
            break;
        }
      },
        error => {

          this.accountService.toastSwal('error', ' ( Network request error ) خطای حین ورود به سیستم رخ داده است')

          console.error("Network request error:", error);

        });

    } catch (error) {

      this.accountService.toastSwal('error', ' ( Login error ) خطای حین دریافت اطلاعات رخ داده است')

      console.error("Login error:", error);

    }

  }

  forgotPw(strMobile) {
    this.accountService.forgotPw(strMobile).subscribe(response => {
      if (strMobile) {
        let res = JSON.stringify(response);
        let resParse = JSON.parse(res)
        switch (resParse.iResult) {
          case 1: this.toastr.success("رمز عبور تا ثانیه های دیگر برای شما پیامک می شود");
            break;
          case 0: this.toastr.error("اطلاعات وارد شده صحیح نمی باشد");
            break;
          case -2: this.toastr.error("کاربری با این مشخصات وجود ندارد");
            break;
          case -3: this.toastr.warning("حساب کاربری شما غیر فعال شده است، با مدیر سامانه تماس بگیرید");
            break;
          case -4: this.toastr.warning("کد اعتبارسنجی برای شما ارسال شد");
          default:
            break;
        }
      } else {
        this.toastr.error("نام کاربری خود را وارد کنید")
      }
    })
  }

  showPass() {

    if (this.inpType == "text") this.inpType = "password";

    else this.inpType = "text";

  }

  checkOtp(strMobile, otp) {

    if (otp) {
      this.accountService.checkOtp(strMobile, otp).subscribe(response => {
        let res = JSON.stringify(response);
        let resPars = JSON.parse(res);

        switch (resPars.iResult) {
          case 0: this.toastr.error("کد وارد شده اشتباه است")
            break;
          case 1: this.toastr.show("به دیــار خوش آمدید")
            localStorage.setItem('db30a17f18d1a8ca3ed63430f48b0b02', this.accountService.encrypt(this.model.strMobile));
            const navigationExtras: NavigationExtras = {
              state: {
                hpnumber: this.model.hpnumber,
                name: resPars.strFullName,
                role: resPars.strRoleName,
                region: resPars.strCityName,
              }
            };
            this.router.navigateByUrl('/dyar');
            break;
          default:
            break;
        }
      })
    }
    else {
      this.toastr.error("لطفا کد ارسالی را وارد کنید");
    }
  }

}
