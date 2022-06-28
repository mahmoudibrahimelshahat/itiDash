import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileIsOpen: boolean = false;
  navbarIsopen: boolean = false;
  toggleIsOpen: boolean = false;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {

  }


  showProfile() {
    this.profileIsOpen = this.profileIsOpen ? false : true;
    this.navbarIsopen = true;
  }

  showNavbar() {
    this.navbarIsopen = this.navbarIsopen ? false : true;
    if (this.profileIsOpen === true) {
      this.profileIsOpen = false

    }


  }
  showsidebar() {
    if (this.toggleIsOpen == false) {
      this.toggleIsOpen = true;
      this.sharedDataService.sendTOggleVal(true)
    }
    else {
      this.toggleIsOpen = false
      this.sharedDataService.sendTOggleVal(false)
    }
    console.log(this.toggleIsOpen)
  }
}
