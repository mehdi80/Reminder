import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalRepository} from '../../helper/local-repository.service';

@Injectable({
  providedIn: 'root'
})
export abstract class HTTPBaseService {
  protected apiUrl: string;

  constructor(
    protected repo:LocalRepository,
    protected http:HttpClient,
    endpoint:string
  ) {
    this.apiUrl = `${repo.getBaseUrl()}/api/${endpoint}`;
  }
}
