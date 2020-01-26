import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "./data.service";
import { ValidationService } from "./validation.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [DataService, ValidationService]
})
export class AppComponent implements OnInit {
  constructor(public dataService: DataService, public router: Router) {}

  ngOnInit(): void {
    this.dataService.load();
  }
}
