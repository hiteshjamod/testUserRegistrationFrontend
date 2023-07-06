import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRegistrationService } from '../_service/user-registration.service';
import { ReponseUserRegistration } from '../Model/reponse-user-registration.mode';
import { UserRegistration } from '../Model/user-registration.mode';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  submitted = false;
  constructor(private service: UserRegistrationService) {
    this.getAllData()
  }

  userRegistrationData: any;

  userRegistration = new FormGroup({
    UserId: new FormControl(0),
    Name: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    Password: new FormControl('', Validators.required),
  })
  get Formcontrol() {
    return this.userRegistration.controls;
  }

  getAllData() {
    this.service.getAllUserRegistrationData().subscribe(s => {
      this.userRegistrationData = s;
    })
  }

  Delete(userId: number) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.deleteUserRegistrationData(userId).subscribe((s: ReponseUserRegistration) => {
          this.getAllData();
          if (s.isSuccess) {
            Swal.fire(
              {
                icon: 'success',
                title: s.messsage,
                showConfirmButton: false,
                timer: 1000
              }
            )

          }
          else {
            Swal.fire(
              {
                icon: 'error',
                title: s.messsage,
                showConfirmButton: false,
                timer: 1000
              }
            )
          }
        }, error => console.warn(error))
      }
    })

  }

  saveUserRegistration() {
    this.submitted = true;
    if (this.userRegistration.invalid) {
      return;
    }
    this.service.addUserRegistration(<UserRegistration>this.userRegistration.value).subscribe((s: ReponseUserRegistration) => {
      if (s.isSuccess) {
        Swal.fire(
          {
            icon: 'success',
            title: s.messsage,
            showConfirmButton: false,
            timer: 1000
          }
        )
        this.getAllData();
        this.submitted = false;
        this.userRegistration.reset();
      }
      else {
        Swal.fire(
          {
            icon: 'error',
            title: s.messsage,
            showConfirmButton: false,
            timer: 1500
          }
        )
      }
    })

  }
}
