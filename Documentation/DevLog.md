## 15.02.2025
-Debug childrens title 	-OK
-Make nodes writable 	-OK
-Make node completable  -OK
-Make node deletable    -OK
-Make parent completable    
-Make child completable -OK
	-Done
Future possible tasks:
    -Track x/y completed childs and nodes

## 06.02.2025 23:30
-Debug childrens title 	-OK
-Make nodes writable 	-OK
-Make node completable  
-Make node deletable
-Make parnent completable
-Make child completable
	-Done

## 05.02.2025 22:44
Added node, next: add functions up to parents for crud

## 04.02.2025
Added deletion for parents and create new todo-parent
Next on agenda:
    -Debugg the buggy mess that is to delete the nested children

## 02.02.2025
Added svgs and hover on buttons on parents
Next on agenda:
    -Same for children
    -Figure out hover on whole todoparent div

## 01.02.2025
-Add stats to the parent body
	-Add a column and triggers that counts
		how many completed childs/nodes

-Text
	-Add text for nodes/render nodes
	-Make'em completable

-Buttons
--Delete
--Add new node
--Add new child
--Add new parent 

	-Draw design for where buttons should be placed
		-place the buttons

-Make child completable
-Make parent completable
-Make node completable

-Add in state switch
-Login screen


## 31.01.2025 21:42
Structural issue, the titles of the childs exist in two components, the modal and the parent,
updating 1 does not update the other, the fix is to pass the set function to the child,
but we cant do this as I've made the children useState an array...

## 30.01.2025 23:05
We slapped in the nodes into the childs properly and made title editable for parent (missing save)
And made sql script to truncate and insert testdata
Next on agenda:
    -Finnish up save on edit title, and make list of rest of endpoints to tie in
        -then tie in endpoints

## 30.01.2025 01:01
Fixed the loadtodochildren to (too sleepy to write full devlog heres my notepad)
Started node/grandchildren addition and refactor:
    -Create Node OK
-Update Node  OK
-Add in on Delete child < delete nodes OK
-Add in on get child < fetch nodes aswell OK
-Delete Node -still need onlydelete node OK

-Split the save into two:
	-editing title auto saves when clicked out
	-body: separate api call
		-(Only call needed onClose())

## 28.01.2025 23:16
Started node/grandchildren addition and refactor:
    -Create Node OK
-Delete Node -still need onlydelete node
-Update Node  

-Add in on Delete child < delete nodes OK
-Add in on get child < fetch nodes aswell OK

-Split the save into two:
	-editing title auto saves when clicked out
	-body: separate api call
		-(Only call needed onClose())

Next on Agenda: FINNISH updateNodeModel!!! 

## 27.01.2025 23:04
We set up tokens on frontend(singleton auth service), set up env, save button on node-body
Next on agenda:
    -Refactor to allow children to hold subtasks (start this one tomorrow please)
        -New table: "node" <--simple bars with a toggle function, the actual tasks of a taskComponent
    -Add in editable titles & bodies (after refac)
    -Figure out the delete button (want a drop end, and choose between archive and delete)
    -Context Switch (Active <--> Archive)
    -Add in a progress bar (just make a statistics endpoint to fetch x of y completed)

## 26.01.2024
Set up the base for the frontend with load func. OK
Next on agenda:
    -Either refactor to allow children to hold subtasks
    -Add in delete endpoints and save title endpoint

## 25.01.2024 00:24
Fixed small issues in update route and made createRoute (fully tested)
Next on agenda:
    -Create moveFromArchive route

## 24.01.2025 00:29
Set up deletion to include childs in same route, and made update for both as well (need to verify update on child)
Next on agenda:
    -Verify update child
    -Create endpoint
    -Movefromarchive endpoint

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