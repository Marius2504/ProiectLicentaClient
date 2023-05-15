import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild("body") body: ElementRef<HTMLElement> | undefined;
  @ViewChild('nav') sidebar: ElementRef<HTMLElement> | undefined;
  @ViewChild('toggle') toggle: ElementRef<HTMLElement> | undefined;
  @ViewChild('searchBox') searchBox: ElementRef<HTMLElement> | undefined;
  @ViewChild('toggleSwitch') toggleSwitch: ElementRef<HTMLElement> | undefined;
  @ViewChild('modeText') modeText: ElementRef<HTMLElement> | undefined;
  modeSwitch:boolean = false;

  constructor() {

  }
  ngAfterViewInit(): void {

  }

  toggleClickEvent() {
    this.sidebar?.nativeElement.classList.toggle("close");
  }
  searchBtnClickEvent() {
    this.sidebar?.nativeElement.classList.remove("close");
  }
  modeSwitchClickEvent() {
    this.modeSwitch = !this.modeSwitch;
    console.log(this.modeSwitch);
    this.body?.nativeElement.classList.toggle("dark");
    if (this.body?.nativeElement.classList.contains("dark")) {
      if (this.modeText != null) {
        this.modeText.nativeElement.innerText = "Light mode";
      }
    } else {
      if (this.modeText != null) {
        this.modeText.nativeElement.innerText = "Dark mode";
      }
    }
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