import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.styl']
})
export class ForgotpassComponent implements OnInit {

  email: string

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
