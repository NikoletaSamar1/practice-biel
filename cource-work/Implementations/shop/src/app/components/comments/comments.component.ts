import { Component } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../../types/comments';
import RegistrationService from '../../services/registration.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  comments: Comment[] = [];

  constructor(private commentsService: CommentsService, private registerService: RegistrationService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  // Load all comments
  loadComments(): void {
    this.commentsService.getComments().subscribe((data) => {
      this.comments = data;
    });
  }

  // Delete a comment
  deleteComment(id: string): void {
    this.commentsService.deleteComment(id).subscribe(() => {
      this.comments = this.comments.filter(c => c.id !== id);
    });
  }

  isLoggedIn(): boolean{
    return this.registerService.isLogged;
  }

  isAdmin(): boolean {
    return this.registerService.isAdmin;
  }
}
