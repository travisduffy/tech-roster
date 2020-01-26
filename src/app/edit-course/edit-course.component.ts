import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { ValidationService } from "../validation.service";
import { Course } from "../data.model";

@Component({
  selector: "app-edit-course",
  templateUrl: "./edit-course.component.html",
  styleUrls: ["./edit-course.component.scss"]
})
export class EditCourseComponent {
  public inputCode: string;
  public inputName: string;

  // ------------------------------------------------------------------------------------ Constructor
  constructor(
    public dataService: DataService,
    public validationService: ValidationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  // ------------------------------------------------------------------------------------ Initialization
  ngOnInit(): void {
    // Redirect to main menu to load data if no data available
    if (!this.dataService.courses) {
      this.router.navigate(["/"]);
      return;
    }

    // Populate field data with selected course
    this.activatedRoute.params.subscribe(params => {
      this.dataService.activeCourse = this.dataService.getCourseById(params.id);
      this.inputCode = this.dataService.activeCourse.code;
      this.inputName = this.dataService.activeCourse.name;
    });
  }

  // ------------------------------------------------------------------------------------ Public Methods
  public submit() {
    // Validate input /w service
    const valid: boolean = this.validationService.validateCourse(
      this.inputCode,
      this.inputName
    );

    if (valid) {
      // Create updated course from input data
      const updatedCourse: Course = {
        code: this.inputCode,
        name: this.inputName
      };

      // Send put request and redirect to main menu
      this.dataService.editCourse(
        this.dataService.activeCourse._id,
        updatedCourse
      );
      this.router.navigate(["/"]);
    }
  }
}
