import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[]
  trash: Note[]

  constructor() { }

  setDefaultNotes(){
    if(!localStorage.getItem('notes')){ localStorage.setItem('notes', JSON.stringify([])) }
    if(!localStorage.getItem('trash')){ localStorage.setItem('trash', JSON.stringify([])) }
  }

  listNotes(){
    this.notes = JSON.parse(localStorage.getItem('notes'))
    this.trash = JSON.parse(localStorage.getItem('trash'))
  }

  getNote(id){
    this.listNotes();
    return this.notes.find( e => id === e.id);
  }

  createNote(body){
    body.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    body.resume = body.text.substring(0,120) + '...'
    this.notes.push(body);
    localStorage.setItem('notes', JSON.stringify(this.notes))
    alert('Note created successfully')
  }

  updateNote(id, body){
    const index = this.notes.findIndex( e => e.id === id)
    body.resume = body.text.substring(0,120) + '...'
    this.notes[index] = body;
    localStorage.setItem('notes', JSON.stringify(this.notes))
    alert('Note updated successfully')
  }

  deleteNote(id){
    this.trash.splice(id,1)
    localStorage.setItem('trash', JSON.stringify(this.trash))
  }

  sendToTrash(id){
    const index = this.notes.findIndex( e => e.id === id)
    this.trash.push(this.notes[index])
    this.notes.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(this.notes))
    localStorage.setItem('trash', JSON.stringify(this.trash))
  }

  restoreTrash(id){
    const noteSelect = this.trash[id]
    this.trash.splice(id,1)
    this.notes.push(noteSelect)
    localStorage.setItem('notes', JSON.stringify(this.notes))
    localStorage.setItem('trash', JSON.stringify(this.trash))
  }
}
