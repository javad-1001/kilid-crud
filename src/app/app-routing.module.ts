import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './components/landing-page/landing-page.component';

import { LoginPageComponent } from './components/login-page/login-page.component';

import { ProfileComponent } from './components/profile/profile.component';

import { UsersComponent } from './components/users/users.component';

import { GurdGuard } from './gurd.guard';


const routes: Routes = [

  { path: '', component: LoginPageComponent },

  {
    path: 'dyar', component: LandingPageComponent, children: [

      { path: 'profile', component: ProfileComponent, canActivate: [GurdGuard] },

      { path: 'users', component: UsersComponent, canActivate: [GurdGuard] },

    ]

  }
  
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})

export class AppRoutingModule { }
