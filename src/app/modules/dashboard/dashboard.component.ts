import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  constructor(
    public noteService: NotesService
  ) { }

  ngOnInit(): void {
    this.noteService.setDefaultNotes()
  }

}
