import React, { useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./Todo/Todo";

function MainComponent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white"; // Set the background color
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas
      }
    }
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo userId={0} userName={"Admin"} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default MainComponent;
