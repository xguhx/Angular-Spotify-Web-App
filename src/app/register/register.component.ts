import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterUser } from '../RegisterUser';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService) {}

  registerUser: RegisterUser = { userName: '', password: '', password2: '' };

  warning = null;
  success = false;
  loading = false;

  sub;

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (
      this.registerUser.userName === '' ||
      this.registerUser.password !== this.registerUser.password2
    ) {
      this.warning = 'Wrong Information!!';
      return;
    }
    this.loading = true;

    this.sub = this.auth.register(this.registerUser).subscribe(
      (success) => {
        this.success = true;
        this.warning = null;
        this.loading = false;
      },
      (err) => {
        this.success = false;
        this.loading = false;
        this.warning = err.error.message;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
