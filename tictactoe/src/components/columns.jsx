import { useState, useEffect } from "react";

function Columns() {
  const [grid, setGrid] = useState({
    topLeft: "h",
    topMiddle: "h",
    topRight: "h",
    middleLeft: "h",
    middleMiddle: "h",
    middleRight: "h",
    bottomLeft: "h",
    bottomMiddle: "h",
    bottomRight: "h",
  });

  const [selectedPlayer, setSelectedPlayer] = useState("x");

  const play = (position) => {
    if (grid[position] == "h") {
      setGrid((prev) => ({ ...prev, [position]: `${selectedPlayer}` }));
      setSelectedPlayer((prev) => (prev === "x" ? "c" : "x"));
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <p
            className="top-left"
            onClick={(e) => {
              play("topLeft");
            }}
          >
            <span className={grid.topLeft}></span>
          </p>
          <p
            className="middle-left"
            onClick={(e) => {
              play("middleLeft");
            }}
          >
            <span className={grid.middleLeft}></span>
          </p>
          <p
            className="bottom-left"
            onClick={(e) => {
              play("bottomLeft");
            }}
          >
            <span className={grid.bottomLeft}></span>
          </p>
        </div>
        <div>
          <p
            className="top-middle"
            onClick={(e) => {
              play("topMiddle");
            }}
          >
            <span className={grid.topMiddle}></span>
          </p>
          <p
            className="middle-middle"
            onClick={(e) => {
              play("middleMiddle");
            }}
          >
            <span className={grid.middleMiddle}></span>
          </p>
          <p
            className="bottom-middle"
            onClick={(e) => {
              play("bottomMiddle");
            }}
          >
            <span className={grid.bottomMiddle}></span>
          </p>
        </div>
        <div>
          <p
            className="top-right"
            onClick={(e) => {
              play("topRight");
            }}
          >
            <span className={grid.topRight}></span>
          </p>
          <p
            className="middle-right"
            onClick={(e) => {
              play("middleRight");
            }}
          >
            <span className={grid.middleRight}></span>
          </p>
          <p
            className="bottom-right"
            onClick={(e) => {
              play("bottomRight");
            }}
          >
            <span className={grid.bottomRight}></span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Columns;
