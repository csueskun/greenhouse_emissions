import { Component } from '@angular/core';
import { EmissionsComponent } from './emissions/emissions';

@Component({
  selector: 'app-root',
  imports: [EmissionsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { }
