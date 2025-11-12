import { Component } from "@angular/core";
import { StoryListComponent } from "./features/story-list/story-list.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [StoryListComponent],
  template: `<app-story-list></app-story-list>`
})
export class AppComponent {}
