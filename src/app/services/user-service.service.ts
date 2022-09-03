import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { User } from '../model/user';
import { LoggingServiceService } from './logging-service.service';
import { SnackbarServiceService } from './snackbar-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    private loggingService: LoggingServiceService,
    private snackbarService: SnackbarServiceService,
    private http: HttpClient
  ) {}

  saveUser(user: User, savedBy: 'system' | 'user'): Observable<User> {
    const isSystem = savedBy === 'system';
    // Http post request here, e.g. this.http.post<User>('API-URL', user)
    // For our demo we simply return the passed user.
    return of(user).pipe(
      tap((value) => {
        this.snackbarService.openSnackbar('Changes saved');
        this.loggingService.addLog(value, isSystem);
      }),
      catchError(() => {
        this.snackbarService.openSnackbar('Failed to save changes');
        this.loggingService.addLog(null, isSystem);
        return EMPTY;
      })
    );
  }
}
