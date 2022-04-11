import { Serializer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonModel } from 'src/app/models/person.model';
import { UserModel } from 'src/app/models/user.model';
import { WtwServiceService } from 'src/app/services/wtw-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup;

  createFormGroup(){
    return new FormGroup({
      Username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      FirstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]{3,100}')]),
      LastName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]{3,100}')]),
      DocumentNumber: new FormControl('',[Validators.required, Validators.pattern('[0-9-.]{7,10}')]),
      Email: new FormControl('',[Validators.required, Validators.email]),
      DocumentType: new FormControl('', [Validators.required])
    });
  }

  constructor(
    private wtwservice: WtwServiceService
  ) {
    this.newUserForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  resetForm(){
    this.newUserForm.reset();
    Object.keys(this.newUserForm.controls).forEach((key) => {
      const control = this.newUserForm.controls[key];
      control.setErrors(null);
    });
    this.newUserForm.updateValueAndValidity();
  }

  async sendForm(){
    let data = this.newUserForm.value;
    let personModel:PersonModel = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      DocumentType: data.DocumentType,
      DocumentNumber: data.DocumentNumber,
      Email: data.Email
    }
    let userModel: UserModel = {
      Username: data.Username,
      Password: data.Password
    }
    try{
      let existUser = await this.wtwservice.userExits(data.Username).toPromise();
      if (existUser.data) {
        Swal.fire(`El usuario ${data.Username} ya existe`,'','error');
      } else {
        let respPerson = await this.wtwservice.createPerson(personModel).toPromise();
        if(respPerson.succeeded){
          userModel.PersonId = respPerson.data;
          let respUser = await this.wtwservice.createUser(userModel).toPromise();
          if(respUser.succeeded){
            this.resetForm();
            Swal.fire('Agregado correctamente','','success');
          } else {
            Swal.fire('Ocurrió un error','','error');
          }
        } else {
          Swal.fire('Ocurrió un error','','error');
        }
      }
    } catch(e){
      console.log(e);
    }
  }
}
