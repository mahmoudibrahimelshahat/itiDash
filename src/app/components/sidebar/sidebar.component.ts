import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showSideBar: boolean = false;

  constructor(private dataSharedService: SharedDataService) { }

  ngOnInit(): void {
    this.getToggleVal()
  }

  getToggleVal() {
    
    this.dataSharedService.reciveTOggleVal().subscribe(data=>{
   this.showSideBar=data
   console.log(this.showSideBar)
    })
  
  }


}
