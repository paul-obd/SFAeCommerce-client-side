import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from '../models/company-info.model';
import { CompanyInfoService } from '../services/company-info.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  companyInfo: CompanyInfo
  markers: any[]

  constructor(private companyInfoService: CompanyInfoService) { }

  ngOnInit(): void {
    this.getCompanyInfo()
  }


  getCompanyInfo(){
    this.companyInfoService.getCompanyInfo().subscribe(
      (res: CompanyInfo)=>{
        console.log(res)
        this.companyInfoService.companyInfo = res
        this.companyInfo = this.companyInfoService.companyInfo
        this.companyInfoService.markers = [{
          location: [parseFloat(res.latitude), parseFloat(res.longitude)],
          tooltip: {
            isShown: false,
          }
        }]
        this.markers = this.companyInfoService.markers
      }
    )
  }
  

}

