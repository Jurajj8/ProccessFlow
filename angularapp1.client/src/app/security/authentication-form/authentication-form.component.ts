import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserCredentials } from '../security.models';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.css'
})
export class AuthenticationFormComponent {
  private formBulder = inject(FormBuilder);
  
  form = this.formBulder.group({
    email: ['', { validators: [Validators.required, Validators.email]}],
    password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
    username: ['', { validators: [Validators.required] }]
  })

  @Input({ required: true })
  title!: string;

  @Input()
  loginError: string | null = null;

  @Input()
  registrationError: string | null = null;


  @Output()
  postForm = new EventEmitter<UserCredentials>();


  getErrorMessagesForEmail(): string {
    let field = this.form.controls.email;

    if (field.hasError('required')) {
      return 'The field Email is required';
    }
    if (field.hasError('email')) {
      return 'The Email is not valid';
    }

    return '';
  }

  getErrorMessagesForPassword(): string {
    let field = this.form.controls.password;

    if (field.hasError('required')) {
      return 'The field Password is required';
    }
    if (field.hasError('minlength')) {
      return 'The Password is short, you must have atleast 8 digits.'
    }

    return '';
  }

  getErrorMessagesForUsername(): string {
    let field = this.form.controls.username;

    if (field.hasError('required')) {
      return 'The field Username is required';
    }

    return '';
  }

  saveChanges() {
    const credentials = this.form.value as UserCredentials;
    this.postForm.emit(credentials);
  }
}
