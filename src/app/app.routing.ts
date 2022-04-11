import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HomeComponent } from './components/home/home.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NewUserComponent } from './components/new-user/new-user.component';

const appRoutes = [
    { path: '', component: HomeComponent,  pathMatch: 'full'},
    { path: 'new-user', component: NewUserComponent,  pathMatch: 'full'},
    { path: 'list-users', component: ListUsersComponent,  pathMatch: 'full'},
    { path: 'authenticate-user', component: AuthenticationComponent,  pathMatch: 'full'}
  ];

  export const routing = RouterModule.forRoot(appRoutes);