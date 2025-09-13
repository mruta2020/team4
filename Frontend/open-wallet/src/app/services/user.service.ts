import {Injectable, signal} from "@angular/core";
import {User} from "../model/user.model";
import {UserType} from "../types/types";
import {map, Observable, of} from "rxjs";
import {USER_MOCK} from "../mock/user.mock";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser = signal<User>(undefined);

  constructor() {

    const localUser = localStorage.getItem("user");
    if (localUser) {
      this._currentUser.set(JSON.parse(localUser));
    }
  }

  get jwtToken(){
    return localStorage.getItem("jwt");
  }

  get currentUser() {
    return this._currentUser();
  }

  set currentUser(user: User) {
    if (user) {
      this._currentUser.set(user);
      localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1dGVudGVAZXhhbXBsZS5jb20iLCJpYXQiOjE3NTc3NzkxNDEsImV4cCI6MTc1Nzc4NjM0MX0.CudGL9-WxSnASCq9FsbqOe2CHi2JobL4mxeJTlUKi2g')
      localStorage.setItem("user", JSON.stringify(this._currentUser()));
    } else {
      localStorage.removeItem("user");
    }
  }

  onLogin(type: UserType): Observable<User> {
    return of(USER_MOCK.find(item => item.type == type)).pipe(
      map((user) => {
        this.currentUser = user;
        return user;
      })
    );
  }

  onLogout() {
    this.currentUser = undefined;
  }

  isEnte(): boolean {
    return this._currentUser()?.type === 'ente';
  }

  isUser(): boolean {
    return this._currentUser()?.type === 'user';
  }

  public formatName() {
    return this.currentUser?.type == 'user' ? this.currentUser?.name + " " + this.currentUser?.surname : this.currentUser?.legalName;
  }

}
