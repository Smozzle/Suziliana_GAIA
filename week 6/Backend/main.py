# from fastapi import FastAPI, Depends, HTTPException, Path
# import models
# from models import Books
# from database import engine, SessionLocal
# from typing import Annotated
# from sqlalchemy.orm import Session
# from pydantic import BaseModel, Field, StrictInt

# app = FastAPI()
# # Create the database tables
# models.Base.metadata.create_all(bind=engine)

# # Open and close a database session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# db_dependency = Annotated[Session, Depends(get_db)]

# # Validate incoming book information
# class BookRequest(BaseModel):
#     title: str = Field(min_length=3, max_length=1000)
#     author: str = Field(min_length=3, max_length=1000)
#     published_year: StrictInt = Field(gt=1800, lt=2026)

# # READ: Get all books
# @app.get("/books")
# async def read_all(db: db_dependency):
#     return db.query(Books).all()

# # READ: Get one book by ID
# @app.get("/books/{book_id}")
# async def get_book_by_id(db: db_dependency, book_id: int, Path(gt=o)):
#     book_result = db.query(Books).filter(Books.id == book_id).first()

#     if book_result is not None:
#         return book_result
        
#     raise HTTPException(status_code=404, detail="Book not found")

# # CREATE: Add a new book
# @app.post("/books")
# async def create_book(db: db_dependency, book_request: BookRequest):
#     new_book = Books(title=book_request.title, author=book_request.author, published_year=book_request.published_year)
#     db.add(new_book)
#     db.commit()
#     db.refresh(new_book)
#     return {"message": "Book successfully added"}

# # UPDATE: Change an existing book
# @app.put("/books/{book_id}")
# async def update_book(  db: db_dependency,
#                         book_id: Annotated[int, Path(ge=1)],
#                         book_request: BookRequest):
#     book_result= db.query(Books).filter(Books.id == book_id).first()

#     if book_result is None:
#         raise HTTPException(status_code=404, detail="Book not found")

#     book_result.title = book_request.title
#     book_result.author = book_request.author
#     book_result.published_year = book_request.published_year

#     db.add(book_result)
#     db.commit()

#     return {"message": "Book successfully updated"}

# # DELETE: Remove a book
# @app.delete("/books/{book_id}")
# async def delete_book(db: db_dependency, book_id: Annotated[int, Path(gt=0)]):
#     book_result = db.query(Books).filter(Books.id == book_id).first()

#     if book_result is None:
#         raise HTTPException(status_code=404, detail="Book not found")
#     else: 
#         db.delete(book_result)
#         db.commit()
#         return {"message": "Book successfully deleted"}

# from fastapi import FastAPI
# from pydantic import BaseModel
# from typing import List, Optional

# app = FastAPI()

# class Receipt(BaseModel):
#     dat: str
#     terminal: str
#     transaction: str
#     amount_RM: float

# atm_database = [
#     {
#         "date": "06/08/202",
#         "terminal": "642251",
#         "transaction": "WITHDRAWAL",
#         "amount_RM": "500.01",
#         "password": "P@$$w0rd123",
#         "house_possessed": 6,
#         "car_possessed": 7
#     }
# ]

# @app.get("/receipt-with-no-model")
# def get_receipt_no_model():
#     return atm_database

# @app.get("/receipt-with-model", response_model=List[Receipt])
# def get_receipt_with_model():
#     return atm_database


# from fastapi import FastAPI
# from routers import right_window, left_window

# app = FastAPI()

# app.include_router(
#     right_window.router,
#     prefix="/right",
#     tags=["Right Window BUttons"]
# )

# app.include_router(
#     left_window.router,
#     prefix="/left",
#     tags=["Left Window Buttons"]
# )

# from fastapi import FastAPI, Depends, Request, HTTPException, status
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from typing import Optional

# # Simple token storage (in production, use a database)
# VALID_TOKENS = {
#     "user123": {"usernamse": "john_doe", "role": "user"},
#     "admin456": {"usernamse": "admin_user", "role": "admin"}
# }

# # Security scheme
# security = HTTPBearer()
# app = FastAPI()

# async def auth_dependency (request: Request, credentials:
# HTTPAuthorizationCredentials = Depends(security)):
#     """Basic authentication dependency"""
#     token = credentials.credentials

#     # Check if token exists in our "database"
#     if token not in VALID_TOKENS:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid authentication token",
#             headers={"WWW-Authentication": "Bearer"},
#         )

#     user_info = VALID_TOKENS[token]
#     print(f"Auth middleware executed for users: {user_info['username']}")

#     # Return user indo insted of just "authenticated"
#     return user_info

# async def admin_dependency(request: Request, user_info: dict = Depends(auth_dependency)):
#     """"Admin-specific dependency that requires authentication first"""

#     # Check if user has admin role
#     if user_info.get("role") != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Admin access required",
#         )

#     print(f"Auth middleware executed for users: {user_info['username']}")
#     return user_info\

# # Public endpoint - no authentication required
# @app.get("/public")
# async def public_endpoint():
#     return {"message": "Public endpoint - no auth required"}

# # Protected endpoint - requires authentication
# @app.get ("/protected")
# async def protected_endpoint(user_info: dict = Depends(auth_dependency)):
#     return {
#         "message": "Protected endpoint",
#         "user": user_info["username"],
#         "role": user_info["role"]
#     }

# # Admin endpoint - requires authentication + admin role
# @app.get("/admin")
# async def admin_endpoint(user_info: dict = Depends(auth_dependency)):
#     return {
#         "message": "Admin endpoint",
#         "user": user_info["username"],
#         "role": user_info["role"]
#     }

from fastapi import FastAPI, Body
from datetime import date



app = FastAPI()



TODOS = [
    {"id": 1, "task": "Learn Python", "completed": False, "due_date": "2025-11-15"},
    {"id": 2, "task": "Practice coding", "completed": False, "due_date": "2025-11-12"},
    {"id": 3, "task": "Take a break", "completed": False, "due_date": "2025-11-12"},
    {"id": 4, "task": "Build FastAPI project", "completed": False, "due_date": "2025-11-18"}
]



next_id = 5



@app.get('/')
async def read_root():
    return {"message": "Welcome to the To-Do List FastAPI!"}



@app.get('/todos')
async def get_all_todos():
    return TODOS



@app.get('/todos/filter_by_completed')
async def get_todos_by_completed_query(completed: bool):
    completed_todos = []
    for todo in TODOS:
        if todo.get("completed") == completed:
            completed_todos.append(todo)
    return completed_todos



@app.get('/todos/filter_by_completed_and_date')
async def get_todos_by_completed_and_date_query(completed: bool, due_date: str):
    todos_to_return = []
    for todo in TODOS:
        if todo.get("completed") == completed and todo.get("due_date").casefold() == due_date.casefold():
            todos_to_return.append(todo)
    return todos_to_return



@app.get('/todos/{task_name}')
async def get_todo_by_task(task_name: str):
    for todo in TODOS:
        if todo.get("task").casefold() == task_name.casefold():
            return todo
    return "Task not found"



@app.post('/todos/create_task')
async def add_task(new_task_body=Body()):
    global next_id
    
    task_name = new_task_body.get("task")
    due_date_str = new_task_body.get("due_date")
    
    if not task_name:
        return "Task name is required."
        
    if not due_date_str:
        due_date_str = date.today().isoformat()
        
    new_task = {
        "id": next_id,
        "task": task_name,
        "completed": False,
        "due_date": due_date_str
    }
    TODOS.append(new_task)
    next_id += 1
    
    return "Task created successfully!"



@app.put('/todos/update_task')
async def update_task(updated_task_body=Body()):
    for i in range(len(TODOS)):
        if TODOS[i].get("task").casefold() == updated_task_body.get("task").casefold():
            TODOS[i] = updated_task_body
            return "Task updated successfully!"
             
    return "Task not found"



@app.delete('/todos/delete_task/{task_name}')
async def delete_task(task_name: str):
    for i, todo in enumerate(TODOS):
        if todo.get("task").casefold() == task_name.casefold():
            TODOS.pop(i)
            return "Task deleted successfully!"
            
    return "Task not found"
