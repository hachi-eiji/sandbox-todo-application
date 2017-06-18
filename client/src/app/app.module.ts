import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TokenStorage } from './common/TokenStorage';
import { HttpClient } from './common/HttpClient';
import { AlertComponent } from './alert/alert.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { LoginService } from './login-form/login.service';
import { TokenService } from './common/token.service';
import { TaskService } from './task/task.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: 'tasks', component: TaskListComponent},
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AlertComponent,
    NotFoundComponent,
    TaskListComponent,
    LoadingComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HttpClient,
    TokenService,
    TokenStorage,
    LoginService,
    TaskService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}