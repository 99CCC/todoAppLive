import React from "react";

interface TodoDetailProps {
    details: string;
}

const TodoDetail: React.FC<TodoDetailProps> = ({ details }) => {
    return <div className="mt-2 p-2 border rounded bg-light">{details}</div>;
};

export default TodoDetail;
