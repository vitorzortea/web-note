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
    if(!localStorage.getItem('notes')){ localStorage.setItem('trash', JSON.stringify([])) }
  }

  ReadNote(){
    this.notes = JSON.parse(localStorage.getItem('notes'))
    this.trash = JSON.parse(localStorage.getItem('trash'))
  }

  createNote(body){
    this.notes.push(body);
    localStorage.setItem('notes', JSON.stringify(this.notes))
    alert('Note Create')
  }

  updateNote(id, body){
    this.notes[id] = body;
    localStorage.setItem('notes', JSON.stringify(this.notes))
    alert('Note Save')
  }

  deleteNote(id){
    this.trash.splice(id,1)
    localStorage.setItem('trash', JSON.stringify(this.trash))
  }

  sendToTrash(id){
    const noteSelect = this.notes[id]
    this.notes.splice(id,1)
    this.trash.push(noteSelect)
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
