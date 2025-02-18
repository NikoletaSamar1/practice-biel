import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../services/comments.service';
import { Comment } from '../../../../types/comments';
import RegistrationService from '../../../services/registration.service';
import { Router, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  comment: Comment = {} as Comment;

  constructor(private commentService: CommentsService, 
              private auth: RegistrationService, private router: Router, private notification: NotificationService
  ) { }

  onSubmit(commentForm: NgForm) {
    if (commentForm.valid) {
      this.comment.username = this.auth.username;
      this.commentService.addComment(this.comment).subscribe({
        next: () => {
          this.notification.showSuccess('Comment added successfully!', 'Well done!');
          this.router.navigate(['/']);
        }
      });
    }
  }
}
