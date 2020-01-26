import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";

@Component({
  selector: "app-delete-course",
  templateUrl: "./delete-course.component.html",
  styleUrls: ["./delete-course.component.scss"]
})
export class DeleteCourseComponent {
  constructor(
    public dataService: DataService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Redirect to main menu to load data if no data available
    if (!this.dataService.courses) {
      this.router.navigate(["/"]);
      return;
    }

    this.activeRoute.params.subscribe(params => {
      this.dataService.activeCourse = this.dataService.getCourseById(params.id);
    });
  }
}
