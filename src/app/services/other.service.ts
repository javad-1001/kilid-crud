import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root',
})
export class OtherService {
  constructor(private router: Router, private accountService: AccountService,) {
  }

  getLocalStorage() {
    var item = this.accountService.decrypt(localStorage.getItem('619afcac863ef1d3c971f2f41956d0b4'));
    return JSON.parse(item);
  }

  getLocation(): boolean {

    var location: any = this.accountService.decrypt(localStorage.getItem('355b37d7d3c0727d2f860b1a2aeca1ba'))

    var obj_location = JSON.parse(location);

    if (obj_location.fLat != 0 && obj_location.fLon != 0) return obj_location;

    return false
  }

  cityModel() {
    
    var data = this.getLocalStorage();

    let model = {

      strCityCode: data.strCityCode,

      strVillageCode: data.strVillageCode,

      strState: data.strState,

    }

    return model;
  }
  sessionModel() {
    var data = this.getLocalStorage();
    let model = {
      iUserManager_User: data.iOrganizationalUser,
      strSession: data.strSession
    }
    return model;
  }
  chartModle() {
    var data = this.getLocalStorage();
    let model = {
      iOrganizationUser: data.iOrganizationalUser,
      strSession: data.strSession,
    }
    return model;
  }

  GetUserReqest() {
    var data = this.getLocalStorage();
    let model = {
      iUserManager_User: data.iOrganizationalUser,
      strSession: data.strSession,
      iUserReqest: 0
    }
    return model;
  }
  basicModel() {
    var data = this.getLocalStorage();
    let model = {
      iOrganizationalRole: data.iOrganizationalRole,
      iOrganizationalUser: data.iOrganizationalUser,
      strCityCode: data.strCityCode,
      strVillageCode: data.strVillageCode,
      strSession: data.strSession
    }
    return model;
  }
  getAbility() {
    var item = this.accountService.decrypt(localStorage.getItem('85b83936a00d52d107d1257ab8d74ef8'));
    return JSON.parse(item);
  }
  aoutorizationModel() {
    var data = this.getLocalStorage();
    let model = {
      iOrganizationalRole: data.iOrganizationalRole,
      iOrganizationalUser: data.iOrganizationalUser,
      strSession: data.strSession
    }
    return model;
  }
  logOut() {
    window.localStorage.clear();
    this.router.navigate(['/']);
  }
}
