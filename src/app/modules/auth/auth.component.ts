import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl']
})
export class AuthComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    if(localStorage.getItem('user')){ this.router.navigate(['/dashboard/notes']); }
  }

  ngOnInit(): void {
    this.userService.setDefaultUsers();
  }

}
