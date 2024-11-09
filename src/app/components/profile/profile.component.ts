import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from 'src/app/services/account.service';

import { BusyService } from 'src/app/services/busy.service';

import { OtherService } from 'src/app/services/other.service';

@Component({

  selector: 'profile',

  templateUrl: './profile.component.html',

  styleUrls: ['./profile.component.css'],

})

export class ProfileComponent implements OnInit {

  user: any = {};

  model: any = {};

  selectedFile: File = null;

  base64Img: any;

  uploadedImage: any;

  Img: any;

  pass: string = "password";

  newPassCheck: string = "password";

  newPassword: string = "password";

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    public loaderService: BusyService,
    private otherService: OtherService,
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private router: Router) {
    this.loaderService.isLoading.next(false);
  }

  ngOnInit(): void {
    this.model = this.otherService.getLocalStorage();
    this.model.strPassword = "";
    this.model.strFullName = this.model.name;
    this.model.name = "";
    if (this.model.Img) {
      this.model.strProfileImage = this.model.Img;
      this.Img = 'data:image/png;base64,' + this.model.Img;
    }
  }

  //convert image to base64
  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64Img = btoa(binaryString);
    this.model.strProfileImage = this.base64Img;
    this.uploadedImage = 'data:image/png;base64,' + this.base64Img;
    this.Img = this.uploadedImage;
  }

  //when user selects a file
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const URL = window.URL || window.webkitURL;
    const img = new Image();

    img.src = URL.createObjectURL(this.selectedFile);

    img.onload = (e: any) => {

      const height = e.path[0].height;
      const width = e.path[0].width;
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.selectedFile);

      if (width > 800) {
        let newWidth = 800;
        let newHeight = (800 * height) / width;

        this.compressImage(img.src, newWidth, newHeight).then((compressed) => {
          this.base64Img = compressed;
          this.model.strProfileImage = this.base64Img;
          this.uploadedImage = 'data:image/png;base64,' + this.base64Img;
        });
      }
      else {
        this.compressImage(img.src, width, height).then((compressed) => {
          this.base64Img = compressed;
          this.model.strProfileImage = this.base64Img;
          this.uploadedImage = 'data:image/png;base64,' + this.base64Img;
        });
      }
    };
  }

  //resize image if width exceeds 800
  compressImage(src, newX, newY) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      };
      img.onerror = (error) => rej(error);
    });
  }

  edite() {
    var model = this.model;
    if (this.model.strNewPassword && this.model.strPassword == "") {
      this.toastr.error('کلمه عبور خود را وارد کنید ');
      return;
    }
    if (this.model.strNewPassword != this.model.strNewPasswordCheck) {
      this.toastr.error('کلمه عبور با تکرارش برابر نیست');
      return;
    }

    this.accountService.UpdateProfile(model).subscribe((response: any) => {
      if (response.iResult == 0) {
        this.toastr.error(response.strError)
      }
      else {
        var localStorage = this.otherService.getLocalStorage();
        localStorage.Img = this.model.strProfileImage;
        localStorage.name = this.model.strFullName;
        window.localStorage.setItem("619afcac863ef1d3c971f2f41956d0b4", this.accountService.encrypt(JSON.stringify(localStorage)));
        this.toastr.success("با موفقیت ویرایش شد ");
        window.location.href = "/dyar";
      }

    });
  }

  showNewPassword() {
    if (this.newPassword == "text") {
      this.newPassword = "password";
    }
    else {
      this.newPassword = "text";

    }
  }

  showNewPasswordCheck() {
    if (this.newPassCheck == "text") {
      this.newPassCheck = "password";
    }
    else {
      this.newPassCheck = "text";

    }
  }

  showPassword() {
    if (this.pass == "text") {
      this.pass = "password";
    }
    else {
      this.pass = "text";

    }
  }

  deleteImg() {
    this.model.strProfileImage = "";
    this.Img = "";
  }
}
