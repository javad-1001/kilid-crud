import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgxPersianModule } from 'ngx-persian';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OtherService } from './services/other.service';
import { MatRadioModule } from '@angular/material/radio';
import { AudioRecordingService } from './services/audio-recording.service';
import { ProfileComponent } from './components/profile/profile.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { MapService } from './services/map.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GurdServiceService } from './Services/gurd-service.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPrintModule } from 'ngx-print';
import { DatePipe } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { NgxEditorModule } from 'ngx-editor';
import { MapDialogComponent } from './components/map-dialog/map-dialog.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LandingPageComponent,
    ProfileComponent,
    MapDialogComponent,
    UsersComponent,
  ],
  imports: [

    NgbTimepickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPersianModule,
    NgxPrintModule,
    FileUploadModule,
    NgxPaginationModule,
    NgxEditorModule,
    MatCheckboxModule,
    TagInputModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),

    NgxAudioPlayerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      easing: 'slide-in',
      timeOut: 3000,
      preventDuplicates: true
    }),
    NgPersianDatepickerModule,
    AngularSignaturePadModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatListModule,
    MatInputModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    NgxMaterialTimepickerModule.setLocale('fa-IR'),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],

  schemas: [],

  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }, DatePipe, OtherService, AudioRecordingService, MapService, GurdServiceService

  ],

  bootstrap: [AppComponent],

})

export class AppModule { }
