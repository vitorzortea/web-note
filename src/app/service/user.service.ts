import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[]
  user: User

  constructor(
    private router: Router
  ) { }

  setDefaultUsers(){
    const DefaltUser = {id: 'aentux', name: 'Admin', email: 'admin@admin.com', password: '123456'}
    if(!localStorage.getItem('users')){ localStorage.setItem('users', JSON.stringify([DefaltUser])) }
    this.users = JSON.parse(localStorage.getItem('users'))
  }

  login(body): boolean{
    this.user = this.users.find((e)=> e.email === body.email && e.password === body.password)
    if(this.user){ localStorage.setItem('user', JSON.stringify(this.user)) }
    return (this.user) ? true : false
  }

  setLogin(){
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  logout(){
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/'])
  }

  createUser(body){
    body.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    this.users.push(body);
    localStorage.setItem('users', JSON.stringify(this.users))
    alert(`Hi ${body.name}! your profile was created successfully`)
    this.router.navigate(['/login'])
  }

  passUser(email){
    const userFind = this.users.find((e)=> e.email === email);
    (userFind) ? alert(`Your password is: ${userFind.password}`) : alert('Usuario não encontrado')
  }

}
