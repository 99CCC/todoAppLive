-- Database: todoLive

-- DROP DATABASE IF EXISTS "todoLive";

CREATE DATABASE "todoLive"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Norwegian_Norway.1252'
    LC_CTYPE = 'Norwegian_Norway.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

GRANT TEMPORARY, CONNECT ON DATABASE "todoLive" TO PUBLIC;

GRANT ALL ON DATABASE "todoLive" TO postgres;

GRANT CONNECT ON DATABASE "todoLive" TO todo_live;

-- SCHEMA: todo

-- DROP SCHEMA IF EXISTS todo ;

CREATE SCHEMA IF NOT EXISTS todo
    AUTHORIZATION postgres;

GRANT ALL ON SCHEMA todo TO postgres;

GRANT USAGE ON SCHEMA todo TO todo_live;

-- SCHEMA: user

-- DROP SCHEMA IF EXISTS "user" ;

CREATE SCHEMA IF NOT EXISTS "user"
    AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA "user"
    IS 'user schema';

GRANT USAGE ON SCHEMA "user" TO PUBLIC;

GRANT ALL ON SCHEMA "user" TO pg_database_owner;

GRANT USAGE ON SCHEMA "user" TO todo_live;

-- Table: todo.node

-- DROP TABLE IF EXISTS todo.node;

-- Table: user.user

-- DROP TABLE IF EXISTS "user"."user";

-- Role: todo_live
-- DROP ROLE IF EXISTS todo_live;

CREATE ROLE todo_live WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  NOBYPASSRLS
  ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:Ju0SHyUusDGLPPtzeIZ/rA==$I1XTa0Lj5pg5rtHhH3fEOchHyiexzir36SjWwTw0KnM=:enPj9hrhcX6UoCnwc13L9tEu5aUstxXinOoWrf5rbds=';

CREATE TABLE IF NOT EXISTS "user"."user"
(
    user_id integer NOT NULL DEFAULT nextval('"user".user_user_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (user_id),
    CONSTRAINT user_username_username1_key UNIQUE (username)
        INCLUDE(username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "user"."user"
    OWNER to postgres;

GRANT ALL ON TABLE "user"."user" TO postgres;

GRANT ALL ON TABLE "user"."user" TO todo_live;

CREATE TABLE IF NOT EXISTS todo.node
(
    node_id integer NOT NULL DEFAULT nextval('todo.node_node_id_seq'::regclass),
    completed boolean DEFAULT false,
    body character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT node_pkey PRIMARY KEY (node_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS todo.node
    OWNER to postgres;

GRANT ALL ON TABLE todo.node TO postgres;

GRANT ALL ON TABLE todo.node TO todo_live;

-- Table: todo.todo_active

-- DROP TABLE IF EXISTS todo.todo_active;

CREATE TABLE IF NOT EXISTS todo.todo_active
(
    todo_id integer NOT NULL DEFAULT nextval('todo.todo_active_todo_id_seq'::regclass),
    user_id integer,
    completed boolean DEFAULT false,
    title character varying COLLATE pg_catalog."default" DEFAULT 'new todo'::character varying,
    CONSTRAINT todo_active_pkey PRIMARY KEY (todo_id),
    CONSTRAINT todo_active_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES "user"."user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS todo.todo_active
    OWNER to postgres;

GRANT ALL ON TABLE todo.todo_active TO postgres;

GRANT ALL ON TABLE todo.todo_active TO todo_live;

-- Trigger: archive_completed_todo

-- DROP TRIGGER IF EXISTS archive_completed_todo ON todo.todo_active;

CREATE OR REPLACE TRIGGER archive_completed_todo
    AFTER UPDATE 
    ON todo.todo_active
    FOR EACH ROW
    WHEN (new.completed = true)
    EXECUTE FUNCTION todo.move_to_archive();

    -- Table: todo.todo_archive

-- DROP TABLE IF EXISTS todo.todo_archive;

CREATE TABLE IF NOT EXISTS todo.todo_archive
(
    todo_id integer NOT NULL,
    user_id integer,
    completed boolean DEFAULT false,
    title character varying COLLATE pg_catalog."default",
    CONSTRAINT todo_archive_pkey PRIMARY KEY (todo_id),
    CONSTRAINT todo_archive_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES "user"."user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS todo.todo_archive
    OWNER to postgres;

GRANT ALL ON TABLE todo.todo_archive TO postgres;

GRANT ALL ON TABLE todo.todo_archive TO todo_live;

-- Trigger: archive_revive_todo

-- DROP TRIGGER IF EXISTS archive_revive_todo ON todo.todo_archive;

CREATE OR REPLACE TRIGGER archive_revive_todo
    AFTER UPDATE 
    ON todo.todo_archive
    FOR EACH ROW
    WHEN (new.completed = false)
    EXECUTE FUNCTION todo.move_to_active();

    -- Table: todo.todo_children

-- DROP TABLE IF EXISTS todo.todo_children;

CREATE TABLE IF NOT EXISTS todo.todo_children
(
    todo_id integer NOT NULL,
    completed boolean DEFAULT false,
    title character varying COLLATE pg_catalog."default" DEFAULT 'title'::character varying,
    depth numeric[] NOT NULL,
    body numeric[],
    CONSTRAINT todo_children_pkey PRIMARY KEY (todo_id, depth)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS todo.todo_children
    OWNER to postgres;

GRANT ALL ON TABLE todo.todo_children TO postgres;

GRANT ALL ON TABLE todo.todo_children TO todo_live;

