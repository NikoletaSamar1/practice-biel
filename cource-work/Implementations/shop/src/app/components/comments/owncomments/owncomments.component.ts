import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../../types/comments';
import { CommentsService } from '../../../services/comments.service';
import RegistrationService from '../../../services/registration.service';
import { NotificationService } from '../../../services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-owncomments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './owncomments.component.html',
  styleUrl: './owncomments.component.css'
})
export class OwncommentsComponent implements OnInit{
  comments: Comment[] = [];

  constructor(private commentsService: CommentsService,
    private auth: RegistrationService,
    private notification: NotificationService
  ){}


  ngOnInit(): void {
    const username = this.auth.username;
    this.commentsService.getCommentsByUsername(username).subscribe((data) => {
      this.comments = data;
    })
  }

  deleteComment(id: string): void {
    this.commentsService.deleteComment(id).subscribe(() => {
      this.comments = this.comments.filter(c => c.id !== id);
    });
  }
}
