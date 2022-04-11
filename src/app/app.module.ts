import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { routing } from './app.routing';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule} from '@angular/common/http';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { MaterialModule } from './material/material.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NewUserComponent,
    ListUsersComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
