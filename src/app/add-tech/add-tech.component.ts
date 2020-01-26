import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { ValidationService } from "../validation.service";
import { Technology, Course } from "../data.model";

@Component({
  selector: "app-add-tech",
  templateUrl: "./add-tech.component.html",
  styleUrls: ["./add-tech.component.scss"]
})
export class AddTechComponent {
  public inputName: string;
  public inputDesc: string;
  public inputDiff: number;
  public inputCourses: Course[];

  // ------------------------------------------------------------------------------------ Initialization
  constructor(
    public dataService: DataService,
    public validationService: ValidationService,
    private router: Router
  ) {
    this.inputName = "";
    this.inputDesc = "";
    this.inputDiff = 1;
    this.inputCourses = this.dataService.courses;
  }

  ngOnInit() {
    // Redirect to main menu to load data if no data available
    if (!this.dataService.courses) {
      this.router.navigate(["/"]);
      return;
    }

    // Reset checkboxes on page load
    this.inputCourses.forEach(course => (course.checked = false));
  }

  // ------------------------------------------------------------------------------------ Public Methods
  public submit() {
    // Validate input /w service
    const valid: boolean = this.validationService.validateTech(
      this.inputName,
      this.inputDesc
    );

    if (valid) {
      // Filter selected courses and format for DB
      const checkedCourses: Course[] = this.dataService.filterCheckedCourses(
        this.inputCourses
      );

      // Create new technology from input data
      const newTech: Technology = {
        name: this.inputName,
        description: this.inputDesc,
        difficulty: this.inputDiff,
        courses: checkedCourses
      };

      // Send post request and redirect to main menu
      this.dataService.addTech(newTech);
      this.router.navigate(["/"]);
    }
  }
}
