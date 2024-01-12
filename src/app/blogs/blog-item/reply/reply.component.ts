import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Reply } from '../../blog';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply: Reply
  userId: string
  replyForm: FormGroup
  editMode: boolean = false

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.replyForm = new FormGroup({
      'commentBody': new FormControl(this.reply.commentBody, Validators.required)
    })
    this.userId = await this.authService.getCurrentUser()
  }

  displayInput() {
    this.editMode = !this.editMode
    const element = document.getElementById(this.reply.replyId.toString())
    window.setTimeout(() => element.focus(), 0)
  }
  
  updateReply() {
    this.editMode = !this.editMode
    const { commentBody } = this.replyForm.value
    this.reply.commentBody = commentBody
  }
}
