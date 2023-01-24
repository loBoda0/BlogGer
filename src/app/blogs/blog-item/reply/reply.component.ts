import { Component, Input, OnInit } from '@angular/core';
import { Reply } from '../../blog';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply: Reply

  constructor() { }

  ngOnInit(): void {
  }

}
