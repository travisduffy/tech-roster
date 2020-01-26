import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { ValidationService } from "../validation.service";
import { Course } from "../data.model";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.scss"]
})
export class AddCourseComponent {
  public inputCode: string;
  public inputName: string;

  // ------------------------------------------------------------------------------------ Constructor
  constructor(
    public dataService: DataService,
    public validationService: ValidationService,
    private router: Router
  ) {
    this.inputCode = "";
    this.inputName = "";
  }

  // ------------------------------------------------------------------------------------ Public Methods
  public submit(): void {
    // Validate input /w service
    const valid: boolean = this.validationService.validateCourse(
      this.inputCode,
      this.inputName
    );

    if (valid) {
      // Create new course from input data
      const newCourse: Course = {
        code: this.inputCode,
        name: this.inputName
      };

      // Send post request and redirect to main menu
      this.dataService.addCourse(newCourse);
      this.router.navigate(["/"]);
    }
  }
}
