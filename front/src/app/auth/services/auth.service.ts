import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environments";
import {AuthInterface, ResponseAuthInterface} from "../interfaces/auth.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials: AuthInterface):Observable<ResponseAuthInterface> {
    return this.http.post<ResponseAuthInterface>(`${environment.baseURL}/auth/login`, {...credentials})
  }

}
