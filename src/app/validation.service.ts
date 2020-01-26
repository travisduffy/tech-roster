import { Injectable } from "@angular/core";

@Injectable()
export class ValidationService {
  public errTechName: boolean;
  public errTechDesc: boolean;

  public errCourseCode: boolean;
  public errCourseName: boolean;

  constructor() {
    this.reset();
  }

  public reset() {
    this.errTechName = false;
    this.errTechDesc = false;
    this.errCourseCode = false;
    this.errCourseName = false;
  }

  public validateTech(name: string, desc: string) {
    // Validate name field
    this.errTechName = name.length == 0 || name.length > 50 ? true : false;

    // Validate description field
    this.errTechDesc = desc.length == 0 || desc.length > 300 ? true : false;

    // Return true if input is valid
    return this.errTechName || this.errTechDesc ? false : true;
  }

  public validateCourse(code: string, name: string) {
    // Validate code field
    this.errCourseCode = code.length == 0 || code.length > 50 ? true : false;

    // Validate name field
    this.errCourseName = name.length == 0 || name.length > 100 ? true : false;

    // Return true if input is valid
    return this.errCourseCode || this.errCourseName ? false : true;
  }
}
