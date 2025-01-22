## 22.01.2025
Set up deletion and made a proper getChild or parent endpoint
Next on agenda:
    -more Mod Endpoints

## 21.01.2025 23:31
Set up authentication, decided to only use tokens against api and not encrypt/decrypt between server and frontend(password),
as we can just use https/ssl. Hashing into database is also done. and again JWT is set up, storing the userId in the token as well (avoids users having to send username as param and me having to do a lookup for every query being ran).
Also mistakenly created the loadTodo endpoint to aggregate everything, which looks cool, but might want to change around to only load Parents first then childs on click.
Next on agenda:
    -More todo Endpoints
        -Create: Parent & Child
        -Read: Separate parent and child loads (pageination? maybe)
        -Update: Update completion status, titles or bodies
        -Delete: Either delete or archive them (archiver trigger has been created)
    -!REMEMBER ADD TITLES TO CHILDREN AS WELL
        

## 20.01.2025
Set up DB, started API, made some middleware,
Next on agenda:
    - Authentication Middleware (JWT)
    - Encrypt/Hash passwords
        -Key pair between front and backend
        -Hashing into the database
    -If time endpoint fiesta