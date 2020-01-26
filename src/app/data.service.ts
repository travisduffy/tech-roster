import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JSON, Technology, Course } from "./data.model";

@Injectable()
export class DataService {
  // ------------------------------------------------------------------------------------ Properties
  private readonly ROOT_URL: string = "http://localhost:8080";
  private http: HttpClient;

  public loading: boolean;
  public technologies: Technology[];
  public courses: Course[];

  public activeTech: Technology;
  public activeCourse: Course;

  // ------------------------------------------------------------------------------------ Constructor
  constructor(myHttp: HttpClient) {
    this.http = myHttp;
    this.loading = true;
  }

  // ------------------------------------------------------------------------------------ Public Methods

  //--- Get technology by ID
  public getTechById(id: string): Technology {
    return this.technologies.find(item => item._id == id);
  }

  //--- Get course by ID
  public getCourseById(id: string): Course {
    return this.courses.find(item => item._id == id);
  }

  //--- Load all course and technology data from DB
  public load(): void {
    this.http.get<JSON>(`${this.ROOT_URL}/get`).subscribe(
      (data: JSON) => {
        this.technologies = data.technologies;
        this.courses = data.courses;
        this.loading = false;
      },
      (err: ExceptionInformation) => {
        console.log("ERROR load()\n" + err);
      }
    );
  }

  //--- Delete course or technology
  public delete(id: string, collection: string): void {
    this.loading = true;
    this.http
      .delete(`${this.ROOT_URL}/${collection}/delete/${id}`, {
        headers: { "Content-Type": "application/json" }
      })
      .subscribe(
        () => this.load(),
        err => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  //--- Add course record to DB
  public addCourse(course: Course): void {
    this.loading = true;
    this.http.post(`${this.ROOT_URL}/courses`, course).subscribe(
      () => this.load(),
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  //--- Update course record in DB
  public editCourse(id: string, course: Course): void {
    this.loading = true;
    this.http.put(`${this.ROOT_URL}/courses/update/${id}`, course).subscribe(
      () => this.load(),
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  //--- Add technology record to DB
  public addTech(tech: Technology) {
    this.loading = true;
    this.http.post(`${this.ROOT_URL}/techs`, tech).subscribe(
      () => this.load(),
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  //--- Edit technology record in DB
  public editTech(id: string, tech: Technology) {
    this.loading = true;
    this.http.put(`${this.ROOT_URL}/techs/update/${id}`, tech).subscribe(
      () => this.load(),
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  // Filters and formats checked-off courses to add to technology documents
  public filterCheckedCourses(courses: Course[]): Course[] {
    return courses
      .filter(course => course.checked)
      .map(course => {
        return { code: course.code, name: course.name };
      });
  }
}
