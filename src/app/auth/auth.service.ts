import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuth = false;
  private tokenTimer;
  private userId: string;

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getUserId() {
    return this.userId;
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);

}

getAuthStatusListener() {
    return this.authStatusListener.asObservable();
}

login(username: string, password: string) {
    const authData: AuthData = {
        username:username,
        password: password,
    }
    this.http.post<{ token: string, expiresIn: number, userId: string }>(URL + '/login', authData)
        .subscribe(res => {
            //console.log(res);
            this.token = res.token;
            if (this.token) {
                const expiresIn = res.expiresIn;
                this.userId = res.userId;
                this.setAuthTimer(expiresIn);
                this.isAuth = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expires = new Date(now.getTime() + (expiresIn * 1000))
                this.saveAuthData(this.token, expires, this.userId);
                this.router.navigate(['/'])
            }

        }, err => {
            this.authStatusListener.next(false);
        })

}

private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
        this.logout();
    }, duration * 1000);
}

autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
        return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
        this.token = authInfo.token;
        this.isAuth = true;
        this.userId = authInfo.userId;
        this.setAuthTimer(expiresIn / 1000)
        this.authStatusListener.next(true);
    }

}

private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate) {
        return;
    }
    return {
        token: token,
        expirationDate: new Date(expirationDate),
        userId: userId,
    }
}

private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());

}

private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
}


}
