import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginFacade } from './login.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', 'login.component.sp.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message$: Observable<string>;

  constructor(private fb: FormBuilder,
              private loginFacade: LoginFacade
  ) {
    this.loginForm = this.fb.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.message$ = loginFacade.loginError$;
  }

  ngOnInit() {}

  login() {
    const form = this.loginForm;
    if (form.valid) {
      this.loginFacade.login(form.get('loginId').value, form.get('password').value);
    } else {
      this.message$ = new Observable<string>(o => o.next('ログインIDもしくはパスワードを入力してください'));
    }
  }
}
