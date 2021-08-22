import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  // @ts-ignore
  signupForm: FormGroup;
  controls: AbstractControl[] = [];
  forbiddenUsernames = ['Chris', 'Anna'];
  forbiddenEmails = ['test@test.com', 'admin@test.com'];
  submitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email],
          this.forbiddenEmailsAsync.bind(this))
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.controls = (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    this.controls.push(control);
  }

  onDeleteHobby(i: number) {
    this.controls.splice(i, 1);
    console.log(i);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.signupForm);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    else {
      return null;
    }
  }

  forbiddenEmailsAsync(control: AbstractControl): Promise<ValidationErrors | null>
    | Observable<ValidationErrors | null> {
    const result = new Promise<any>(((resolve, reject) => {
      setTimeout(()=> {
        if (this.forbiddenEmails.indexOf(control.value) != -1) {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    }));
    return result;
  }
}
