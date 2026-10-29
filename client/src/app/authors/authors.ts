
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { BooksService } from '../books/service/books-service';
import { AuthorEntity } from '../books/model/bookEntity';

@Component({
  selector: 'app-authors',
  imports: [FormsModule, NgIf],
  templateUrl: './authors.html',
  styleUrl: './authors.css'
})
export class Authors {
  authorId: number | null = null;
  author: AuthorEntity | null = null;
  errorMessage: string = '';
  private booksService = inject(BooksService);

  searchAuthor(): void {
    this.author = null;
    this.errorMessage = '';

    if (this.authorId === null || this.authorId <= 0) {
      this.errorMessage = 'Please enter a valid author ID.';
      return;
    }

    this.booksService.getAuthor(this.authorId).subscribe({
      next: (data: AuthorEntity) => {
        this.author = data;
      },
      error: () => {
        this.errorMessage = 'Author not found.';
      }
    });
  }
}
