import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiTaskListComponent } from './ui-task/ui-task-list/ui-task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UiTaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calendar-challenger';
}
