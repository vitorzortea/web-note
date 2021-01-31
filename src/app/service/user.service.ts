import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor(
    private router: Router
  ) { }

  setDefaultUsers(){
    const DefaltUser = {id: 'aentux', name: 'Admin', email: 'admin@admin.com', password: '123456', tags: []}
    if(!localStorage.getItem('users')){ localStorage.setItem('users', JSON.stringify([DefaltUser])) }
  }

  login(body): boolean{
    const users = JSON.parse(localStorage.getItem('users')) as User[];
    const user = users.find((e)=> e.email === body.email && e.password === body.password)
    if(user){ localStorage.setItem('user', JSON.stringify(user)) }
    return (user) ? true : false
  }

  getUser(){ return JSON.parse(localStorage.getItem('user')) as User; }
  getUsers(){ return JSON.parse(localStorage.getItem('users')) as User[]; }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/'])
  }

  createUser(body){
    const users = JSON.parse(localStorage.getItem('users')) as User[];
    body.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    users.push(body);
    localStorage.setItem('users', JSON.stringify(users))
    alert(`Hi ${body.name}! your profile was created successfully`)
    this.router.navigate(['/login'])
  }

  passUser(email){
    const users = JSON.parse(localStorage.getItem('users')) as User[];
    const userFind = users.find((e)=> e.email === email);
    (userFind) ? alert(`Your password is: ${userFind.password}`) : alert('Usuario não encontrado')
  }

}
