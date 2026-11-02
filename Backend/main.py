from fastapi import FastAPI, Body

app = FastAPI()

BOOKS = [
    {"title": "Fourth Wing", "author": "Rebecca Yarros", "published_year": 2023},
    {"title": "On Freedom", "author": "Timothy Snyder", "published_year": 2024},
    {"title": "It Starts with US", "author": "Collen Hoover", "published_year": 2022},
    {"title": "The Book of Bill", "author": "Alex Hirsh", "published_year": 2024},
    {"title": "On Tyranny", "author": "Timothy Snyder", "published_year": 2017},
]

@app.get("/")
async def read_root():
    return {"message": "Hello World!"}

@app.get("/books")
async def getAllBooks():
    return BOOKS

@app.get("/books/{book_title}")
async def get_book(book_title: str):
    for book in BOOKS:
        if book.get("title").casefold() == book_title.casefold(): 
            return book

    return "Book Not Found"

@app.get("/books/{book_title}")
async def get_book(book_title: str):
    for book in BOOKS:
        if book.get("title").casefold() == book_title.casefold():
            return book
    return "Book Not Found"

@app.get("/books/")
async def get_book_by_query(author: str, published_year: int):
    books_to_return = []
    for book in BOOKS:
        if book.get("author").casefold()  == author.casefold() and \
                book.get("published_year") == published_year:
            books_to_return.append(book)

    return books_to_return

@app.post("/books/create_book")
async def create_book(new_book=Body()):
    BOOKS.append(new_book)

    return "Book Record Created Successfully!"