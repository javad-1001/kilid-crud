import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AccountService } from 'src/app/services/account.service';

import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { OtherService } from '../../../app/services/other.service';

import { UntypedFormControl } from '@angular/forms';

import { filter } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  modal: NgbModalRef;

  birthDate = new UntypedFormControl();

  editBirthDate = new UntypedFormControl();

  EnterpriseUser: any = [];

  list_OrganizationalUser = [];

  searchlist_result;

  list_Manager;

  list_orgRole;

  list_zone;

  temporaryStorage;


  constructor(
    private AccountService: AccountService,
    private OtherService: OtherService,
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private cdr: ChangeDetectorRef

  ) {

    config.backdrop = 'static';

    config.keyboard = false;
  }

  ngOnInit(): void {

    this.getOrganizationalUser();

    this.getManager_list();

    this.getOrgRole();

    this.getZone();

  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  getOrganizationalUser() {

    var model = {

      iOrganizationalUser: this.OtherService.basicModel().iOrganizationalUser,

      strSession: this.OtherService.basicModel().strSession

    }

    this.AccountService.organizationalUser2(model).subscribe((data) => {

      let res = JSON.parse(data.toString())

      this.list_OrganizationalUser = res;

      this.searchlist_result = res

    })
  }

  getManager_list() {

    var model = {

      iOrganizationalUser: this.OtherService.basicModel().iOrganizationalUser,

      strSession: this.OtherService.basicModel().strSession

    }

    this.AccountService.Manager_List(model).subscribe((data) => {

      let res = JSON.parse(data.toString())

      this.list_Manager = res;

    })

  }

  getOrgRole() {

    var model = {

      iOrganizationalUser: this.OtherService.basicModel().iOrganizationalUser,

      strSession: this.OtherService.basicModel().strSession

    }

    this.AccountService.OrganizationalRole_List(model).subscribe((data) => {

      let res = JSON.parse(data.toString())

      this.list_orgRole = res;

    })

  }

  getZone() {

    var model = this.OtherService.basicModel();

    this.AccountService.GetZone(model).subscribe((data) => {

      this.list_zone = data;

    })

  }

  new_EnterpriseUser(content) {

    this.birthDate = new UntypedFormControl();

    this.modal = this.modalService.open(content, { size: 'xl' });

  }

  openEdit(item, content) {


    var model = {

      iOrganizationalUser: this.OtherService.basicModel().iOrganizationalUser,

      strSession: this.OtherService.basicModel().strSession,

      iOrganizationalUser_User: item.iOrganizationalUser
    }

    this.AccountService.orgUser_Info(model).subscribe((data) => {

      let res = JSON.parse(data.toString());

      res[0].strPassword = '';
      
      this.editBirthDate.setValue(res[0].strBirthDate.trim());

      this.temporaryStorage = res[0];

      this.temporaryStorage.confirm_Password = res[0].strPassword;

      this.modal = this.modalService.open(content, { size: 'xl' });

    })



  }

  saveNew_User(form) {


    if (form.invalid) {

      return this.AccountService.toastSwal('error', 'لطفا فرم را با دقت تکمیل کنید')

    }

    else {

      if (form.value.strPassword !== form.value.confirm_Password) {

        return this.AccountService.toastSwal('error', 'رمز عبور و تکرار رمز عبور با هم مطابقت ندارند')
      }

      else {

        form.value['iOrganizationalUser'] = this.OtherService.basicModel().iOrganizationalUser;

        form.value['strSession'] = this.OtherService.basicModel().strSession;

        form.value['strFullName'] = form.value.name + ' ' + form.value.lastName;

        form.value['tiSubregion'] = form.value.tiSubregion ? form.value.tiSubregion : '0';

        form.value['strBirthDate'] = this.birthDate.value ? this.birthDate.value : '';

        this.AccountService.OrganizationalUser_Save(form.value).subscribe((data) => {

          let res = JSON.parse(data.toString())

          if (res.bError) {
            return this.AccountService.toastSwal('error', res.strError)
          }

          else {
            this.AccountService.toastSwal('success', 'کاربر جدید با موفقیت ثبت شد');
            this.getOrganizationalUser();
            this.EnterpriseUser = [];
            this.closeModal();
          }


        })

      }

    }




  }

  editUser_Data(form) {

    if (this.temporaryStorage.strPassword !== this.temporaryStorage.confirm_Password) {

      return this.AccountService.toastSwal('error', 'رمز عبور و تکرار رمز عبور با هم مطابقت ندارند')

    }

    Swal.fire({

      title: 'آیا از ویرایش اطلاعات اطمینان دارید؟',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      confirmButtonColor: '#10b981',
      confirmButtonText: 'تایید',
      cancelButtonText: 'لغو',

    }).then((result) => {

      if (result.isConfirmed) {

        this.temporaryStorage.iOrganizationalUser_User = this.temporaryStorage.iOrganizationalUser;
        this.temporaryStorage.iOrganizationalUser = this.OtherService.basicModel().iOrganizationalUser;
        this.temporaryStorage.strSession = this.OtherService.basicModel().strSession;
        this.temporaryStorage.strBirthDate = this.editBirthDate.value ? this.editBirthDate.value : '';

        this.AccountService.OrganizationalUser_Edit(this.temporaryStorage).subscribe((data) => {

          let res = JSON.parse(data.toString())

          if (res.bError) {
            return this.AccountService.toastSwal('error', res.strError)
          }

          else {
            this.AccountService.toastSwal('success', 'کاربر  با موفقیت ویرایش شد');
            this.getOrganizationalUser();
            this.closeModal();
          }

        })


      }

    })
  }

  delete_User(item) {

    Swal.fire({

      title: `آیا از حذف ${item.strFullName} اطمینان دارید؟`,
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      confirmButtonText: 'تایید',
      confirmButtonColor: '#ef4444',
      cancelButtonText: 'لغو',

    }).then((result) => {

      if (result.isConfirmed) {

        var model = {

          iOrganizationalUser: this.OtherService.basicModel().iOrganizationalUser,

          strSession: this.OtherService.basicModel().strSession,

          iOrganizationalUser_User: item.iOrganizationalUser
        }

        this.AccountService.OrganizationalUser_Delete(model).subscribe((data) => {

          let res = JSON.parse(data.toString())

          if (!res.bError) {

            Swal.fire({

              title: 'با موفقیت حذف شد',
              icon: 'success',
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'تایید',

            })

            this.getOrganizationalUser()

          }

          else {

            this.AccountService.toastSwal('error', res.strError)
          }

        })

      }

    })

  }

  closeModal() {

    this.modal.close()

  }

  keySearch(keyValue) {


    let key = keyValue.value.key;

    if (key.length > 2) {

      this.list_OrganizationalUser = this.searchlist_result.filter((el) => {

        return el.strFullName.includes(key) || el.strUserName.includes(key) || el.strOrganizationalRole_strComment.includes(key)

      })

    }

    else if (key == '') {

      this.list_OrganizationalUser = this.searchlist_result;

    }



  }


}
