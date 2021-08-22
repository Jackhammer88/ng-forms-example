import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  statuses: string[] = ['Stable', 'Critical', 'Finished'];
  forbiddenNames: string[] = ['Test', 'test'];
  forbiddenEmails: string[] = ['mail@inbox.ru', 'admin@test.com'];
  projectForm = new FormGroup({
    'project': new FormControl(null, [Validators.required,
    this.checkForForbiddenNames.bind(this)]),
    'email': new FormControl(null, [Validators.required,
      Validators.email], this.checkForForbiddenNamesAsync.bind(this)),
    'status': new FormControl('Stable')
  });
  submitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  checkForForbiddenNames(control: FormControl): {[s: string]: boolean} | null {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    else {
      return null;
    }
  }

  checkForForbiddenNamesAsync(control: AbstractControl) : Promise<ValidationErrors | null>
    | Observable<ValidationErrors | null> {
    const promise = new Promise<any>(((resolve, reject) => {
      setTimeout(()=> {
        if(this.forbiddenEmails.indexOf(control.value) != -1) {
          resolve({'emailsIsForbidden': true})
        } else {
          resolve(null);
        }
      },2000);
    }));
    return promise;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.projectForm);
  }
}
