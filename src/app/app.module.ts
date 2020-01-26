import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Route } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { AddTechComponent } from "./add-tech/add-tech.component";
import { EditTechComponent } from "./edit-tech/edit-tech.component";
import { DeleteTechComponent } from "./delete-tech/delete-tech.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { DeleteCourseComponent } from "./delete-course/delete-course.component";

const routes: Route[] = [
  { path: "", component: MainComponent },
  { path: "add-tech", component: AddTechComponent },
  { path: "edit-tech/:id", component: EditTechComponent },
  { path: "delete-tech/:id", component: DeleteTechComponent },
  { path: "add-course", component: AddCourseComponent },
  { path: "edit-course/:id", component: EditCourseComponent },
  { path: "delete-course/:id", component: DeleteCourseComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddTechComponent,
    EditTechComponent,
    DeleteTechComponent,
    AddCourseComponent,
    EditCourseComponent,
    DeleteCourseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
