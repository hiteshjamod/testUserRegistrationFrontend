import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReponseUserRegistration } from '../Model/reponse-user-registration.mode';
import { UserRegistration } from '../Model/user-registration.mode';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) { }
  addUserRegistration(data: UserRegistration) {
    return this.http.post<ReponseUserRegistration>("https://localhost:7212/api/User", data);
  }

  getAllUserRegistrationData() {

    return this.http.get<UserRegistration>("https://localhost:7212/api/User");
  }
  deleteUserRegistrationData(userId: number) {
    return this.http.delete<ReponseUserRegistration>("https://localhost:7212/api/User/" + userId);
  }

}
