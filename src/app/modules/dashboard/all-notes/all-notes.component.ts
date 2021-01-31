import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.styl']
})
export class AllNotesComponent implements OnInit {
  search: string
  subscription: Subscription
  tag: string

  constructor(
    public notesService: NotesService,
    public route: ActivatedRoute
  ) {
    this.subscription = route.queryParams.subscribe(val => {
      this.tag = val.tag;
      this.notesService.notes = this.notesService.listNotes()
      if(this.tag){
        this.notesService.notes = this.notesService.notes.filter((e)=> e.tag == this.tag)
      }
    });
  }

  ngOnInit(): void { }

  searchNote(){
    this.notesService.notes = this.notesService.listNotes();
    if(this.search){
      this.notesService.notes = this.notesService.notes.filter((e)=> e.title.indexOf(this.search) == 0 || e.text.indexOf(this.search) == 0 )
    }
  }

}
