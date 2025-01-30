DELETE FROM todo.node;
DELETE FROM todo.todo_children;
DELETE FROM todo.todo_archive;
DELETE FROM todo.todo_active;

SELECT setval('todo.todo_active_todo_id_seq', 1, true);
SELECT setval('todo.node_node_id_seq', 1, true);

-- Insert parents into todo_active
INSERT INTO todo.todo_active (user_id, completed, title) 
VALUES 
    (0, false, 'TestTitle 2'),
    (0, false, 'TestTitle 3'),
    (0, false, 'TestTitle 4'),
    (0, false, 'TestTitle 5'),
    (0, false, 'TestTitle 6'),
    (0, false, 'TestTitle 7'),
    (0, false, 'TestTitle 8'),
    (0, false, 'TestTitle 9'),
    (0, false, 'TestTitle 10'),
    (0, false, 'TestTitle 11');

-- Insert parents into todo_archive
INSERT INTO todo.todo_archive (todo_id, user_id, completed, title) 
VALUES 
    (13, 0, false, 'TestTitle 12'),
    (14, 0, false, 'TestTitle 13'),
    (15, 0, false, 'TestTitle 14'),
    (16, 0, false, 'TestTitle 15'),
    (17, 0, false, 'TestTitle 16'),
    (18, 0, false, 'TestTitle 17'),
    (19, 0, false, 'TestTitle 18'),
    (20, 0, false, 'TestTitle 19'),
    (21, 0, false, 'TestTitle 20'),
    (22, 0, false, 'TestTitle 21');

-- Insert children ensuring each parent has at least one and some variation
INSERT INTO todo.todo_children (todo_id, completed, title, depth, body)
VALUES
    -- Children for Parent 1
    (1, true, 'Child 1', ARRAY[0], ARRAY[1,2]),
    (1, true, 'Subchild of Child 1', ARRAY[0,0], ARRAY[3,4]),
    (1, true, 'Another Subchild of Child 1', ARRAY[0,1], ARRAY[5,6]),
    (1, true, 'Another level deeper', ARRAY[0,1,0], ARRAY[7,8]),

    -- Children for Parent 2
    (2, true, 'Child 1', ARRAY[0], ARRAY[9,10]),
    (2, true, 'Child 2', ARRAY[1], ARRAY[11,12]),

    -- Children for Parent 3
    (3, true, 'Only Child', ARRAY[0], ARRAY[13,14]),

    -- Children for Parent 4
    (4, true, 'Child 1', ARRAY[0], ARRAY[15,16]),
    (4, true, 'Child 2', ARRAY[1], ARRAY[17,18]),
    (4, true, 'Subchild of Child 2', ARRAY[1,0], ARRAY[19,20]),
    (4, true, 'Another Subchild', ARRAY[1,1], ARRAY[21,22]),

    -- Children for Parent 5
    (5, true, 'Single Child', ARRAY[0], ARRAY[23,24]),

    -- Children for Parent 6
    (6, true, 'Child 1', ARRAY[0], ARRAY[25,26]),
    (6, true, 'Child 2', ARRAY[1], ARRAY[27,28]),
    (6, true, 'Subchild of Child 2', ARRAY[1,0], ARRAY[29,30]),
    
    -- Children for Parent 7
    (7, true, 'Solo Child', ARRAY[0], ARRAY[31,32]),
    (7, true, 'Deeper Subchild', ARRAY[0,0], ARRAY[33,34]),

    -- Children for Parent 8
    (8, true, 'First Child', ARRAY[0], ARRAY[35,36]),
    (8, true, 'Second Child', ARRAY[1], ARRAY[37,38]),
    (8, true, 'Subchild', ARRAY[1,0], ARRAY[39,40]),

    -- Children for Parent 9
    (9, true, 'Only Child', ARRAY[0], ARRAY[41,42]),

    -- Children for Parent 10
    (10, true, 'First Child', ARRAY[0], ARRAY[43,44]),
    (10, true, 'Second Child', ARRAY[1], ARRAY[45,46]),
    (10, true, 'Third Child', ARRAY[2], ARRAY[47,48]),
    (10, true, 'Deeper Subchild', ARRAY[2,0], ARRAY[49,50]);

-- Insert nodes (double the count since each child gets two nodes)
INSERT INTO todo.node (completed, body) VALUES
    (true, 'node body numero uno (one)'),
    (true, 'node body numero dos (two)'),
    (true, 'node body numero tres (three)'),
    (true, 'node body numero cuatro (four)'),
    (true, 'node body numero cinco (five)'),
    (true, 'node body numero seis (six)'),
    (true, 'node body numero siete (seven)'),
    (true, 'node body numero ocho (eight)'),
    (true, 'node body numero nueve (nine)'),
    (true, 'node body numero diez (ten)'),
    (true, 'node body numero once (eleven)'),
    (true, 'node body numero doce (twelve)'),
    (true, 'node body numero trece (thirteen)'),
    (true, 'node body numero catorce (fourteen)'),
    (true, 'node body numero quince (fifteen)'),
    (true, 'node body numero dieciséis (sixteen)'),
    (true, 'node body numero diecisiete (seventeen)'),
    (true, 'node body numero dieciocho (eighteen)'),
    (true, 'node body numero diecinueve (nineteen)'),
    (true, 'node body numero veinte (twenty)'),
    (true, 'node body numero veintiuno (twenty-one)'),
    (true, 'node body numero veintidós (twenty-two)'),
    (true, 'node body numero veintitrés (twenty-three)'),
    (true, 'node body numero veinticuatro (twenty-four)'),
    (true, 'node body numero veinticinco (twenty-five)'),
    (true, 'node body numero veintiséis (twenty-six)'),
    (true, 'node body numero veintisiete (twenty-seven)'),
    (true, 'node body numero veintiocho (twenty-eight)'),
    (true, 'node body numero veintinueve (twenty-nine)'),
    (true, 'node body numero treinta (thirty)'),
    (true, 'node body numero treinta y uno (thirty-one)'),
    (true, 'node body numero treinta y dos (thirty-two)'),
    (true, 'node body numero treinta y tres (thirty-three)'),
    (true, 'node body numero treinta y cuatro (thirty-four)'),
    (true, 'node body numero treinta y cinco (thirty-five)'),
    (true, 'node body numero treinta y seis (thirty-six)'),
    (true, 'node body numero treinta y siete (thirty-seven)'),
    (true, 'node body numero treinta y ocho (thirty-eight)'),
    (true, 'node body numero treinta y nueve (thirty-nine)'),
    (true, 'node body numero cuarenta (forty)'),
    (true, 'node body numero cuarenta y uno (forty-one)'),
    (true, 'node body numero cuarenta y dos (forty-two)'),
    (true, 'node body numero cuarenta y tres (forty-three)'),
    (true, 'node body numero cuarenta y cuatro (forty-four)'),
    (true, 'node body numero cuarenta y cinco (forty-five)'),
    (true, 'node body numero cuarenta y seis (forty-six)'),
    (true, 'node body numero cuarenta y siete (forty-seven)'),
    (true, 'node body numero cuarenta y ocho (forty-eight)'),
    (true, 'node body numero cuarenta y nueve (forty-nine)'),
    (true, 'node body numero cincuenta (fifty)');