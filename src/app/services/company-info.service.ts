import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompanyInfo } from '../models/company-info.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {


  companyInfo: CompanyInfo;
  markers: any[] = []

  constructor(private http: HttpClient) { }


  getCompanyInfo(){
    return this.http.get<CompanyInfo>(environment.apiUrl + 'CompanyInfo/company-info')
  }
}
