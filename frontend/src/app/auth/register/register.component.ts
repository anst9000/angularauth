import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    username: '',
    email: '',
    password: ''
  }

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this._router.navigate(['/special']);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
    });
  }
}
