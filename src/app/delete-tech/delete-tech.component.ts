import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";

@Component({
  selector: "app-delete-tech",
  templateUrl: "./delete-tech.component.html",
  styleUrls: ["./delete-tech.component.scss"]
})
export class DeleteTechComponent {
  constructor(
    public dataService: DataService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Redirect to main menu to load data if no data available
    if (!this.dataService.technologies) {
      this.router.navigate(["/"]);
      return;
    }
    this.activeRoute.params.subscribe(params => {
      this.dataService.activeTech = this.dataService.getTechById(params.id);
    });
  }
}
