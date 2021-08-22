import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ExampleComponent } from './example/example.component';

const routes: Routes = [
  { path: 'simple', component: SimpleFormComponent },
  { path: 'reactive', component: ReactiveFormComponent },
  { path: 'example', component: ExampleComponent },
  { path: '', redirectTo: 'example', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SimpleFormComponent,
    ReactiveFormComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
