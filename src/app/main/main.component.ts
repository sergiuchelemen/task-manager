import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task';
import { HttpClientModule } from '@angular/common/http';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    CommonModule,
    HttpClientModule,
    CdkDropListGroup,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  toDoTask: string = '';
  inProgressTask: string = '';
  completedTask: string = '';

  addTask(status: string): void {
    if (this.toDoTask != '' && status === 'todo') {
      this.toDoTasks.push(new Task(this.toDoTask));
      this.toDoTask = '';
    }
    if (this.inProgressTask != '' && status === 'inProgress') {
      this.inProgressTasks.push(new Task(this.inProgressTask));
      this.inProgressTask = '';
    }
    if (this.completedTask != '' && status === 'completed') {
      this.completedTasks.push(new Task(this.completedTask));
      this.completedTask = '';
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
