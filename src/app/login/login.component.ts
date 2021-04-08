import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService, private router: Router) {}
  sub;
  user: User = { userName: '', password: '', _id: null };
  warning;
  loading = false;

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (this.user.userName === '' || this.user.password === '') {
      this.warning = 'Wrong Information!!';
      return;
    }
    this.loading = true;

    // console.log('submit', {
    //   value: form.value,
    // });

    this.sub = this.auth.login(this.user).subscribe(
      (success) => {
        localStorage.setItem('access_token', success.token); // Keep an eye here
        this.warning = null;
        this.loading = false;

        this.router.navigate(['/newReleases']);
      },
      (err) => {
        this.loading = false;
        this.warning = err.error.message;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
