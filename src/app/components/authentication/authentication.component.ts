import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { WtwServiceService } from 'src/app/services/wtw-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  AuthenticateUserForm: FormGroup;
  constructor(
    private wtwservice : WtwServiceService
  ) { }

  ngOnInit(): void {
    this.AuthenticateUserForm = this.createFormGroup();
  }

  createFormGroup(){
    return new FormGroup({
      Username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  resetForm(){
    this.AuthenticateUserForm.reset();
    Object.keys(this.AuthenticateUserForm.controls).forEach((key) => {
      const control = this.AuthenticateUserForm.controls[key];
      control.setErrors(null);
    });
    this.AuthenticateUserForm.updateValueAndValidity();
  }


  async sendForm(){
    let data = this.AuthenticateUserForm.value;
    let userModel: UserModel = {
      Username: data.Username,
      Password: data.Password
    }
    let resp = await this.wtwservice.authenticateUser(userModel).toPromise();
    if (resp.succeeded && resp.data) {
      this.resetForm();
      Swal.fire('Autenticado de forma correcta','','success');
    } else {
      Swal.fire('Usuario o contraseña incorrecto','','error');
    }
  }
}
