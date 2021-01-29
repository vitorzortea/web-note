import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.styl']
})
export class NoteComponent implements OnInit {

  note: Note
  id: string
  subscription: Subscription

  constructor(
    public noteService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = route.params.subscribe(val => {
      this.id = this.route.snapshot.paramMap.get('id');
      (this.id) ? this.note = this.noteService.notes[this.id] : this.note = {title: '', resume: '', text: '', date: new Date()}
    });
  }
  ngOnInit(): void {}

  send(){
    if (this.id){
      this.noteService.updateNote(this.id, this.note)
    } else {
      this.noteService.createNote(this.note)
      this.router.navigate(['/dashboard/notes/'])
    }
  }
  trash(){
    this.noteService.sendToTrash(this.id);
    this.router.navigate(['/dashboard/notes/'])
  }

  ngOnDestroy() { this.subscription.unsubscribe() }
}