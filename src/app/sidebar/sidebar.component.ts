import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild("body") body: ElementRef<HTMLElement> | undefined;
  @ViewChild('nav') sidebar: ElementRef<HTMLElement> | undefined;
  @ViewChild('toggle') toggle: ElementRef<HTMLElement> | undefined;
  @ViewChild('searchBox') searchBox: ElementRef<HTMLElement> | undefined;
  @ViewChild('toggleSwitch') toggleSwitch: ElementRef<HTMLElement> | undefined;
  @ViewChild('modeText') modeText: ElementRef<HTMLElement> | undefined;
  modeSwitch:boolean = false;
  isLogged:boolean = false;
  isAdmin:boolean = false;
  isArtist:boolean = false;
  id:string = "";
  

  constructor(private authService:AuthService) {

  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(Response =>{
      this.isLogged = Response; 
      this.isAdmin = this.authService.isAdmin();
      this.isArtist = this.authService.isArtist();
    })
  }

  toggleClickEvent() {
    this.sidebar?.nativeElement.classList.toggle("close1");
  }
  Logout()
  {
    this.authService.logout();
  }
}

/*

<script>
    const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    })
    searchBtn.addEventListener("click", () => {
      sidebar.classList.remove("close");
    })
    modeSwitch.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
      } else {
        modeText.innerText = "Dark mode";

      }
    });
  </script>

  extended:boolean = true
  width:string = "200px"
  
  reverse(){
    switch(this.extended)
    {
      case true:this.width = "50px";break;
      case false:this.width = "200px";break;
    }
    this.extended = !this.extended;
  }

*/