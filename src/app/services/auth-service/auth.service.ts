import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from '../user.service';
import {User} from '../../models/User';
import {map, tap, catchError, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getLoginStateFromStorage());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();


  private users$: Observable<User[]>;

  constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers().pipe(
      shareReplay(1),
      catchError(err => {
        console.error('Error retrieving users:', err);
        throw err;
      })
    );
  }

  private setLoginState(state: boolean) {
    localStorage.setItem('loggedIn', state ? 'true' : 'false');
  }

  private getLoginStateFromStorage(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  login(username: string|null|undefined, password: string|null|undefined): Observable<boolean> {
    return this.users$.pipe(
      map((users: User[]): boolean => {
        const user = users.find(u => u.username === username && u.password === password);
        return !!user;
      }),
      tap(success => {
        if (success) {

          this.setLoginState(true);
        }
        this.isLoggedInSubject.next(success);
      })
    );
  }

  logout(): void {
    this.setLoginState(false);
    this.isLoggedInSubject.next(false);
  }

}
