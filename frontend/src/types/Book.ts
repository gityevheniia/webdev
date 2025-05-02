export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    description: string;
    file_url: string;
    createdAt: string;
    updatedAt: string;
    totalPages?: number;
    annotation: string;
    publication_year?: number;
  }
  