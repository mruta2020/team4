import { Injectable, signal } from "@angular/core";
import { User } from "../model/user.model";
import { UserType } from "../types/types";
import { map, Observable, of } from "rxjs";
import { USER_MOCK } from "../mock/user.mock";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser = signal<User>(undefined);

  constructor(private router: Router) {
  }

  get currentUser() {
    return this._currentUser;
  }

  setCurrentUser(user: User) {
    this._currentUser.set(user);
  }


  onLogin(type: UserType): Observable<User> {
    return of(USER_MOCK.find(item => item.type == type)).pipe(
      map((user) => {
        this._currentUser.set(user);
        return user;
      })
    );
  }

  onLogout() {
    const lastType = this._currentUser()?.type;
    this._currentUser.set(undefined);

    if (lastType === 'ente') {
      this.router.navigate(['/ente/login']);
    } else if (lastType === 'user') {
      this.router.navigate(['/user/login']);
    }
  }


  isEnte(): boolean {
    return this._currentUser()?.type === 'ente';
  }

  isUser(): boolean {
    return this._currentUser()?.type === 'user';
  }


}
