import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  confirmPassword: string;

  samePass = false
  error = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  createUser(){
    if(!this.samePass){
      return alert('O campo "Senha" e o campo "Confirmar Senha" tem que ser iguais')
    }else{
      const body = { id: '', name: this.name, email: this.email, password: this.password, tags: [] }
      this.userService.setDefaultUsers();
      this.userService.createUser(body);
    }
  }

  verifyPass(){
    if(this.password && this.confirmPassword){
      if(this.password == this.confirmPassword){
        this.samePass = true;
        this.error = '';
      } else {
        this.samePass = false;
        this.error = 'passwords diferentes';
      }
    }else{
      this.samePass = false;
      this.error = '';
    }
  }

}
