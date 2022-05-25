import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { SnackbarService } from '../services/snackbar.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;


  constructor(private fb: FormBuilder, public authService: AuthService, private snackbar: SnackbarService, private route: Router,
     public loadService: LoadingService, public toolbarService: ToolbarService,
     private translate: TranslateService) { }

  ngOnInit(): void {
    this.initLogInFormGroup()
  }

  initLogInFormGroup(){
    this.loginFormGroup = this.fb.group({
      clientCode: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }


  SubmitLoginForm(){
  
    let loginModel = new Login()
    loginModel.clientCode = this.loginFormGroup.get('clientCode')?.value
    loginModel.password = this.loginFormGroup.get('password')?.value
    this.authService.LoginInputClientModel = loginModel
    this.loadService.loadBar = true
    this.authService.login(loginModel).subscribe(
      (res: {client: any, token: any})=>{
        this.authService.storeAndSetAuthData(res.client, res.token)
          
      this.translate.stream("Logged In Successfully!").subscribe(res => this.snackbar.openSuccessSnackBar(res))
        this.loadService.loadBar = false
        this.route.navigate(['/home'])

       }
       //,
      // (err)=>{
      //   if(err.status == 403){
      //     this.snackbar.openErrSnackBar('nlaabet '+err.error)
      //   }
      //   else if (err.statusCode != 500) {
        
      //     this.snackbar.openErrSnackBar(err.error)
      //     console.log(err.status);
          
      //   }
      //   else{
      //     this.snackbar.openErrSnackBar("Internal Server Error Occured!")
      //   }
      //   this.loadService.loadBar = false
      // }
    )
  }
}
