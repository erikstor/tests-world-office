import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      user: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
    });
  }


  login() {
    this.authService.login({...this.form.value})
      .subscribe((resp) => {
        localStorage.setItem('jwt', resp.token)
        this.router.navigate(['/equipos']);
      })
  }
}
