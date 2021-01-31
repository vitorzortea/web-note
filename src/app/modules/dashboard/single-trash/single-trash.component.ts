import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-single-trash',
  templateUrl: './single-trash.component.html',
  styleUrls: ['./single-trash.component.styl']
})
export class SingleTrashComponent implements OnInit {

  note: Note
  id: string
  subscription: Subscription

  constructor(
    public noteService: NotesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.subscription = route.params.subscribe(val => {
      this.id = val.id;
      (this.id) ? this.note = this.noteService.getTrash(this.id) :  this.note = new Note
    });
  }

  ngOnInit(): void {}

  restaure(){
    this.noteService.restoreTrash(this.id);
    this.router.navigate(['/dashboard/notes'])
  }
  trash(){
    this.noteService.deleteNote(this.id);
    this.router.navigate(['/dashboard/trash'])
  }

  ngOnDestroy() { this.subscription.unsubscribe() }

}
