import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { ValidationService } from "../validation.service";
import { Technology, Course } from "../data.model";

@Component({
  selector: "app-edit-tech",
  templateUrl: "./edit-tech.component.html",
  styleUrls: ["./edit-tech.component.scss"]
})
export class EditTechComponent implements OnInit {
  public inputName: string;
  public inputDesc: string;
  public inputDiff: number;
  public inputCourses: Course[];

  // ------------------------------------------------------------------------------------ Initialization
  constructor(
    public dataService: DataService,
    public validationService: ValidationService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Redirect to main menu to load data if no data available
    if (!this.dataService.technologies) {
      this.router.navigate(["/"]);
      return;
    }

    // Get data for selected technology by URL param
    this.activeRoute.params.subscribe(params => {
      this.dataService.activeTech = this.dataService.getTechById(params.id);

      // Pre-fill form with data with model binding
      const { name, description, difficulty } = this.dataService.activeTech;
      this.inputName = name;
      this.inputDesc = description;
      this.inputDiff = difficulty;
      this.inputCourses = this.dataService.courses;

      // Check boxes on courses that occur in selected technology
      const activeCourses: Course[] = this.dataService.activeTech.courses;
      this.inputCourses.forEach(course => {
        activeCourses.forEach(activeCourse => {
          if (activeCourse.code === course.code) {
            course.checked = true;
          }
        });
      });
    });
  }

  // ------------------------------------------------------------------------------------ Public Methods
  public submit() {
    // Validate input w/ service
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
      const updatedTech: Technology = {
        name: this.inputName,
        description: this.inputDesc,
        difficulty: this.inputDiff,
        courses: checkedCourses
      };

      this.dataService.editTech(this.dataService.activeTech._id, updatedTech);
      this.router.navigate(["/"]);
    }
  }
}
