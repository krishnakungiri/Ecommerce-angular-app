import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    TopMenuComponent,
    LeftSidebarComponent,
    HomeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class AppComponent {
  title = 'Ecommerce-app';

}
