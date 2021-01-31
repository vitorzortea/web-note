import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[];
  trash: Note[];

  constructor() { }

  setDefaultNotes(){
    if(!localStorage.getItem('notes')){ localStorage.setItem('notes', '[]') }
    if(!localStorage.getItem('trash')){ localStorage.setItem('trash', '[]') }
  }

  listNotes(){
    const user = JSON.parse(localStorage.getItem('user')) as User
    const allNotes = JSON.parse(localStorage.getItem('notes')) as Note[]
    this.sortNotes(allNotes, 'notes')
    return allNotes.filter((eFilter)=> eFilter.idUser.some((eSome)=> eSome == user.id));
  }
  listTrash(){
    const user = JSON.parse(localStorage.getItem('user')) as User
    const allTrash = JSON.parse(localStorage.getItem('trash')) as Note[]
    this.sortNotes(allTrash, 'trash')
    return allTrash.filter((eFilter)=> eFilter.idUser.some((eSome)=> eSome == user.id));
  }

  sortNotes(array: Note[], bd: string) {
    array.sort((a, b) => (a.date < b.date) ? 1 : -1)
    localStorage.setItem(bd, JSON.stringify(array))
  }

  getNote(id){
    const notes = this.listNotes();
    return notes.find( e => id === e.id);
  }

  getTrash(id){
    const notes = this.listTrash();
    return notes.find( e => id === e.id);
  }

  createNote(body: Note, mensagem?: boolean){
    console.log(body)
    const allNotes = JSON.parse(localStorage.getItem('notes')) as Note[]
    const user = JSON.parse(localStorage.getItem('user')) as User
    body.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    body.idUser = [user.id];
    body.resume = body.text.substring(0,120) + '...'
    allNotes.push(body)
    localStorage.setItem('notes', JSON.stringify(allNotes))
    if(!mensagem){ alert('Note created successfully') }
  }

  updateNote(id, body){
    const allNotes = JSON.parse(localStorage.getItem('notes')) as Note[]
    const index = allNotes.findIndex( e => e.id === id)
    body.resume = body.text.substring(0,120) + '...'
    allNotes[index] = body;
    localStorage.setItem('notes', JSON.stringify(allNotes))
    alert('Note updated successfully')
  }

  deleteNote(id){
    const allTrash = JSON.parse(localStorage.getItem('trash')) as Note[]
    const index = allTrash.findIndex( e => e.id === id)
    allTrash.splice(index,1)
    localStorage.setItem('trash', JSON.stringify(allTrash))
    this.trash = this.listTrash()
  }

  sendToTrash(id){
    const allNotes = JSON.parse(localStorage.getItem('notes')) as Note[]
    const allTrash = JSON.parse(localStorage.getItem('trash')) as Note[]
    const index = allNotes.findIndex( e => e.id === id)
    allTrash.push(allNotes[index])
    allNotes.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(allNotes))
    localStorage.setItem('trash', JSON.stringify(allTrash))
  }

  restoreTrash(id){
    const allNotes = JSON.parse(localStorage.getItem('notes')) as Note[]
    const allTrash = JSON.parse(localStorage.getItem('trash')) as Note[]
    const index = allTrash.findIndex( e => e.id === id)
    allNotes.push(allTrash[index])
    allTrash.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(allNotes))
    localStorage.setItem('trash', JSON.stringify(allTrash))
  }
}
