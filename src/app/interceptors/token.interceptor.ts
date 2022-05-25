import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { SnackbarService } from '../services/snackbar.service';
import { DialogService } from '../services/dialog.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,  private loadService: LoadingService
    , private snackbar: SnackbarService, private dialog: DialogService, private route: Router, private translate: TranslateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.authService.loadTokenAndUser();
    let tokenizedReq = request.clone({
      setHeaders:{
        Authorization: `Bearer ${this.authService.authToken}`
      }
    })
    
    return next.handle(tokenizedReq)
    .pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err.status == 1001){
          this.dialog.openIsLoggedInDialog().afterClosed().subscribe(
            (result)=>{
              if(result == 'true'){
                this.loadService.loadBar = true
                this.authService.forceLogout(this.authService.LoginInputClientModel).subscribe(
                  (res: any)=>{
                    this.authService.login(this.authService.LoginInputClientModel).subscribe(
                      (res: {client: any, token: any})=>{
                        this.authService.storeAndSetAuthData(res.client, res.token)
          
                        this.translate.stream("Logged In Successfully!").subscribe(res => this.snackbar.openSuccessSnackBar(res))
                        this.loadService.loadBar = false
                        this.route.navigate(['/home'])
                       } )
                  }
                )
              }
            }
          )
        }
        else if(err.status == 403){
          this.authService.logoutReq().subscribe(
            (res: any)=>{
              this.authService.logOutClearStorage()
              this.route.navigate(['login'])
              this.translate.stream("You've Been Forced To Logout").subscribe(res => this.snackbar.openErrSnackBar(res))
            }
          )
        }
        else if (err.status != 500) {
        
          this.snackbar.openErrSnackBar(err.error)
          
        }
        else{
         
          this.translate.stream("Internal Server Error Occured!").subscribe(res => this.snackbar.openErrSnackBar(res))

        }
        this.loadService.loadBar = false

        return throwError(err)
      })
      )
    ;
  }
}
