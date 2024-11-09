import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';

import Swal from 'sweetalert2';


@Injectable({

  providedIn: 'root'

})

export class AccountService {

  encryptionKey = environment.encryptionKey;

  constructor(private http: HttpClient) { }

  login(model: any) {

    return this.http.post(environment.baseUrl + 'Organization_App_Login', model);
  }

  Geocoding(model: any) {
    return this.http.post(environment.baseUrl + 'Geocoding', model);
  }

  ORG_CityVillageDefaultPos(model: any) {
    return this.http.post(environment.baseUrl + 'ORG_CityVillageDefaultPos', model);
  }

  ReverseGeocoding(model: any) {
    return this.http.post(environment.baseUrl + 'ReverseGeocoding', model);
  }

  GetUserAbility(model) {
    return this.http.post(environment.baseUrl + 'ORG_GetUserAbility', model)
  }

  forgotPw(hpnumber) {
    return this.http.post(environment.baseUrl + 'Organization_App_Forgetpassword', { strMobile: hpnumber });
  }

  checkOtp(hpnumber, otp) {
    return this.http.post(environment.baseUrl + 'Organization_App_CheckRegisterOTP', { strMobile: hpnumber, strActiovationCode: otp });
  }

  UpdateProfile(userRequest) {

    return this.http.post(environment.baseUrl + 'Organization_UpdateProfile', userRequest)
  }



  toastSwal(type, string, timer?) {

    if (timer === undefined) timer = 3000;

    Swal.fire({
      position: 'bottom-end',
      icon: type,
      toast: true,
      background: type == 'success' ? '#008631' : type == 'error' ? '#DF1C24' : type == 'warning' ? '#54c3e6' : '#3fc3ee',
      color: '#fff',
      timerProgressBar: true,
      title: string,
      customClass: {
        title: 'toaster-lineSpacing'
      },
      showConfirmButton: false,
      timer: timer
    })
  }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.encryptionKey).toString();
  }

  decrypt(value: string) {
    return value != null ? CryptoJS.AES.decrypt(value, this.encryptionKey).toString(CryptoJS.enc.Utf8) : '';
  }




  
  organizationalUser2(model) {
    return this.http.post(environment.baseUrl + `GetListOfOrganizationalUser2`, model)
  }

  Manager_List(model) {
    return this.http.post(environment.baseUrl + `Manager_List`, model)
  }

  OrganizationalRole_List(model) {
    return this.http.post(environment.baseUrl + 'OrganizationalRole_List', model);
  }

  OrganizationalUser_Save(model) {
    return this.http.post(environment.baseUrl + 'OrganizationalUser_Save', model);
  }

  OrganizationalUser_Edit(model) {
    return this.http.post(environment.baseUrl + 'OrganizationalUser_Edit', model);
  }

  OrganizationalUser_Delete(model) {
    return this.http.post(environment.baseUrl + 'OrganizationalUser_Delete', model);
  }

  orgUser_Info(model) {
    return this.http.post(environment.baseUrl + 'OrganizationalUser_Info', model);

  }
  GetZone(model: any) {
    return this.http.post(environment.baseUrl + 'GetZone', model);
  }


}

