const books = [
  { id: 1, title: 'book1' },
  { id: 2, title: 'book2' },
  { id: 3, title: 'book3' },
  { id: 4, title: 'book4' },
  { id: 5, title: 'book5' },
];
let bookId = 6;

export const getBooks = (req, res) => {
  res.json(books);
};

export const getBookById = (req, res, next) => {
  try {
    if (isNaN(+req.params.id)) {
      throw new Error('유효하지 않은 id입니다.');
    }
    const book = books.find((book) => +req.params.id === book.id);
    if (!book) {
      throw new Error('존재하지 않는 책입니다.');
    }
    res.json(book);
  } catch (e) {
    next(e);
  }
};

export const createBook = (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) throw new Error('책 제목을 입력해주세요.');
    const book = { id: bookId, title };
    books.push(book);
    ++bookId;
    res.json(book);
  } catch (e) {
    next(e);
  }
};

export const updateBookById = (req, res, next) => {
  try {
    const { title } = req.body;
    const id = +req.params.id;
    if (!title) {
      throw new Error('책 제목을 입력해주세요');
    }
    if (isNaN(id)) {
      throw new Error('id 값은 number로 입력해주세요');
    }
    const bookIndex = books.findIndex((book) => id === book.id);
    if (bookIndex === -1) {
      throw new Error('존재하지 않는 책입니다.');
    }
    const book = { ...books[bookIndex], title };
    books.splice(bookIndex, 1, book);
    res.json(book);
  } catch (e) {
    next(e);
  }
};

export const deleteBookById = (req, res, next) => {
  try {
    const id = +req.params.id;
    if (isNaN(id)) {
      throw new Error('id 값은 number로 입력해주세요');
    }
    const bookIndex = books.findIndex((book) => id === book.id);
    if (bookIndex === -1) {
      throw new Error('존재하지 않는 책입니다.');
    }
    books.splice(bookIndex, 1);
    res.json(books);
  } catch (e) {
    next(e);
  }
};
