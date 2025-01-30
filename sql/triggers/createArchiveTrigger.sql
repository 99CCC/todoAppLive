CREATE OR REPLACE FUNCTION todo.move_to_archive()
RETURNS TRIGGER AS $$
BEGIN
	IF NEW.completed = TRUE THEN
		INSERT INTO todo.todo_archive (todo_id, user_id, completed, title)
		VALUES (NEW.todo_id, NEW.user_id, NEW.completed, NEW.title);
		DELETE FROM todo.todo_active WHERE todo_id = NEW.todo_id;
	END IF;
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER archive_completed_todo
AFTER UPDATE ON todo.todo_active
FOR EACH ROW
WHEN (NEW.completed = TRUE)
EXECUTE FUNCTION todo.move_to_archive();