import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {LocalRepository} from '../helper/local-repository.service';
import {HTTPBaseService} from './HTTP-Base/http-base.service';
import {User} from '../models/User';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService extends HTTPBaseService{

  constructor(repo: LocalRepository, http: HttpClient) {
    super(repo, http, 'v1');
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
