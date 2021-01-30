import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  email: string
  password: string

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  enterDashboard(){
    this.router.navigate(['/dashboard'])
  }

  login(){
    this.userService.setDefaultUsers();
    if(!this.email || !this.password){
      return alert('Todos os campos!');
    }
    if(this.userService.login({email: this.email, password: this.password})){
      this.router.navigate(['/dashboard'])
    }else{
      alert('Usuário invalido')
    }

  }

}
