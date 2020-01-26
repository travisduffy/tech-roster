import { Component } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent {
  constructor(public dataService: DataService) {}
}
