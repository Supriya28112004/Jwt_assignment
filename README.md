### Easy ##

POST /register: A simple endpoint that adds a new user to the in-memory array.

![Screenshot 2025-06-29 141244](https://github.com/user-attachments/assets/1cf6839c-841c-4157-8f9f-36ca6c2275af)

POST /login:
    - Takes username  and password in the request body.
    - Checks if the user exists in your array.

![Screenshot 2025-06-29 141944](https://github.com/user-attachments/assets/e196997f-b1b5-4115-922b-17f2e4ba4201)

- Created a GET /api/secret-quote endpoint.
- Applied  my authentication middleware to this route.
- If the request is successful, it should return a simple JSON response.

![Screenshot 2025-06-29 151755](https://github.com/user-attachments/assets/2866c899-5e40-4c57-8961-c6b4facfc8c4)

## Meduium ##
  ## endpoints ##
- When a user registers via POST /register, hash my password using `bcrypt` before storing it in my in-memory database.
- During login (POST /login), use bcrypt.compare() to securely check the provided password against the stored hash.
- GET /api/todos: It will return only the to-do items belonging to the currently logged-in user.
- POST /api/todos: It will create a new to-do item and associate it with the currently logged-in user.
- DELETE /api/todos/:id: It only allow a user to delete a to-do item if they are the owner of that item.

![Screenshot 2025-06-29 182831](https://github.com/user-attachments/assets/166c7c38-e68f-4a93-9580-70cd06c63d90)

![Screenshot 2025-06-29 190336](https://github.com/user-attachments/assets/b8edcb5e-aabf-44de-a57a-e249c0cb15ab)

![Screenshot 2025-06-29 190714](https://github.com/user-attachments/assets/48588e81-822f-412f-8ba4-c59d20800f18)

![Screenshot 2025-06-29 190638](https://github.com/user-attachments/assets/44aeb013-028e-430a-b1a0-7a373b30f003)

![Screenshot 2025-06-29 190714](https://github.com/user-attachments/assets/2ddda3bb-1359-420a-a99d-af5b295af32f)

![Screenshot 2025-06-29 190940](https://github.com/user-attachments/assets/b1b88c71-7c32-4561-b477-3ff62b28d8a8)
