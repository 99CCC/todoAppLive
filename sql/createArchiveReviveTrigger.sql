CREATE OR REPLACE FUNCTION todo.move_to_active()
RETURNS TRIGGER AS $$
BEGIN
	IF NEW.completed = FALSE THEN
		INSERT INTO todo.todo_active (todo_id, user_id, completed, title)
		VALUES (NEW.todo_id, NEW.user_id, NEW.completed, NEW.title);
		DELETE FROM todo.todo_archive WHERE todo_id = NEW.todo_id;
	END IF;
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER archive_revive_todo
AFTER UPDATE ON todo.todo_archive
FOR EACH ROW
WHEN (NEW.completed = FALSE)
EXECUTE FUNCTION todo.move_to_active();