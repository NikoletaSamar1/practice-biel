import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../../types/comments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = 'http://localhost:3000/comments'; // JSON server URL

  constructor(private http: HttpClient) {}

  // Fetch all comments
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl);
  }

  // Fetch a single comment by ID
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/${id}`);
  }

  // Add a new comment
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl, comment);
  }

  // Update an existing comment
  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}/${comment.id}`, comment);
  }

  // Delete a comment
  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCommentsByUsername(username: string): Observable<Comment[]> {
    const url = `${this.baseUrl}?username=${username}`;
    return this.http.get<Comment[]>(url);
  }
}
