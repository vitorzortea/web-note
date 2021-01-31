import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[]
  allNotes: Note[]
  trash: Note[]
  allTrash: Note[]

  constructor() { }

  setDefaultNotes(){
    if(!localStorage.getItem('notes')){ localStorage.setItem('notes', JSON.stringify([])) }
    if(!localStorage.getItem('trash')){ localStorage.setItem('trash', JSON.stringify([])) }
  }

  listNotes(){
    const user = JSON.parse(localStorage.getItem('user')) as User
    this.allNotes = JSON.parse(localStorage.getItem('notes')) as Note[]
    this.allTrash = JSON.parse(localStorage.getItem('trash')) as Note[]
    this.sortNotes(this.allNotes, this.allTrash)
    this.notes = this.allNotes.filter((e)=> e.idUser === user.id);
    this.trash = this.allTrash.filter((e)=> e.idUser === user.id);
  }

  sortNotes(notes, trash) {
    notes.sort((a, b) => (a.date < b.date) ? 1 : -1);
    localStorage.setItem('notes', JSON.stringify(notes))
    trash.sort((a, b) => (a.date < b.date) ? 1 : -1);
    localStorage.setItem('trash', JSON.stringify(trash))
  }

  getNote(id){
    this.listNotes();
    return this.notes.find( e => id === e.id);
  }

  getTrash(id){
    this.listNotes();
    return this.trash.find( e => id === e.id);
  }

  createNote(body: Note, mensagem?: boolean){
    this.allNotes = JSON.parse(localStorage.getItem('notes')) as Note[]
    const user = JSON.parse(localStorage.getItem('user')) as User
    body.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    body.idUser = user.id;
    body.resume = body.text.substring(0,120) + '...'
    this.allNotes.push(body)
    localStorage.setItem('notes', JSON.stringify(this.allNotes))
    this.listNotes();
    if(!mensagem){
      alert('Note created successfully')
    }
  }

  updateNote(id, body){
    const index = this.allNotes.findIndex( e => e.id === id)
    body.resume = body.text.substring(0,120) + '...'
    this.allNotes[index] = body;
    localStorage.setItem('notes', JSON.stringify(this.allNotes))
    alert('Note updated successfully')
  }

  deleteNote(id){
    const index = this.allTrash.findIndex( e => e.id === id)
    this.allTrash.splice(index,1)
    localStorage.setItem('trash', JSON.stringify(this.allTrash))
    this.listNotes()
  }

  sendToTrash(id){
    const index = this.allNotes.findIndex( e => e.id === id)
    this.allTrash.push(this.notes[index])
    this.allNotes.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(this.allNotes))
    localStorage.setItem('trash', JSON.stringify(this.allTrash))
    this.listNotes()
  }

  restoreTrash(id){
    const index = this.allTrash.findIndex( e => e.id === id)
    console.log(this.trash[index])
    this.allNotes.push(this.trash[index])
    this.allTrash.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(this.allNotes))
    localStorage.setItem('trash', JSON.stringify(this.allTrash))
    this.listNotes()
  }
}
