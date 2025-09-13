import {Injectable, signal} from "@angular/core";
import {User} from "../model/user.model";
import {UserType} from "../types/types";
import {map, Observable, of} from "rxjs";
import {USER_MOCK} from "../mock/user.mock";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser = signal<User>(undefined);

  constructor() {
  }

  get currentUser() {
    return this._currentUser;
  }


  onLogin(type: UserType): Observable<User> {
    return of(USER_MOCK.find(item => item.type == type)).pipe(
      map((user) => {
        this._currentUser.set(user);
        return user;
      })
    );
  }

  isEnte() {

  }

  isUser() {

  }

}
