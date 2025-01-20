/*
Possible solution to not having FK on child to parent,
maybe flourish this up a bit and add a column to the user.user
that checks if theyre dormant or in process of deleting their user,
i.e 30 days after user deletion kill all orphans
*/

CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
    'delete_orphaned_children', 
    '0 0 1 * *', 
    $$ DELETE FROM todo_children_active 
       WHERE todo_id NOT IN (SELECT todo_id FROM todo_active); $$
);
