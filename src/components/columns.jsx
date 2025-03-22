import { useState, useEffect, use } from "react";

var posit = null;
var end1 = 0;
var a = 1;
function Columns() {
  const [end, setEnd] = useState(0);

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

  const [winGrid, setWinGrid] = useState([]);

  useEffect(() => {
    checkForWin(posit, 1);
  }, [grid]);

  const [gridKeys, setGridKeys] = useState([
    "topLeft",
    "topMiddle",
    "topRight",
    "middleLeft",
    "middleMiddle",
    "middleRight",
    "bottomLeft",
    "bottomMiddle",
    "bottomRight",
  ]);

  const resetGrid = () => {
    for (let item = 0; item < gridKeys.length; item++) {
      const element = gridKeys[item];
      setGrid((prev) => ({
        ...prev,
        [element]: "h",
      }));
    }
    end1 = 0;
  };

  const [selectedPlayer, setSelectedPlayer] = useState("x");
  const [selectedPlayerBot, setSelectedPlayerBot] = useState("c");
  const [bot, setBot] = useState(false);

  const randomNumber = () => {
    let random = Math.floor(Math.random() * 9);
    return random;
  };

  const botPlay = (updatedGrid) => {
    if (
      Object.keys(updatedGrid).find((key) => updatedGrid[key] === "h") ==
      undefined
    ) {
      return;
    } else {
      let botPlayPosition = randomNumber();
      while (updatedGrid[gridKeys[botPlayPosition]] !== "h") {
        botPlayPosition = randomNumber();
      }
      const position = gridKeys[botPlayPosition];

      setGrid((prev) => ({
        ...prev,
        [position]: selectedPlayerBot,
      }));
    }
  };

  const gameFinish = (win, index) => {
    if (end1 == 0) {
      console.log(win);
      for (let item = 0; item < gridKeys.length; item++) {
        const element = gridKeys[item];
        if (grid[element] == index) {
          setGrid((prev) => ({ ...prev, [element]: index + "-win" }));
        }
        console.log(element);
      }

      console.log(grid);
      end1 = 1;
    }
  };

  const checkForWin = (position, x) => {
    const updatedGrid = grid;
    updatedGrid[position] = selectedPlayer;
    const winGrid1 = [
      /* HORIZONTAL LINES */
      [updatedGrid.topLeft, updatedGrid.topMiddle, updatedGrid.topRight],
      [
        updatedGrid.middleLeft,
        updatedGrid.middleMiddle,
        updatedGrid.middleRight,
      ],
      [
        updatedGrid.bottomLeft,
        updatedGrid.bottomMiddle,
        updatedGrid.bottomRight,
      ],

      /* DIAGONALS */
      [updatedGrid.topLeft, updatedGrid.middleMiddle, updatedGrid.bottomRight],
      [updatedGrid.topRight, updatedGrid.middleMiddle, updatedGrid.bottomLeft],

      /* VERTICAL LINES */
      [updatedGrid.topLeft, updatedGrid.middleLeft, updatedGrid.bottomLeft],
      [
        updatedGrid.topMiddle,
        updatedGrid.middleMiddle,
        updatedGrid.bottomMiddle,
      ],
      [updatedGrid.topRight, updatedGrid.middleRight, updatedGrid.bottomRight],
    ];
    for (let index = 0; index < winGrid1.length; index++) {
      const element = winGrid1[index];
      if (
        element[0] == element[1] &&
        element[0] == element[2] &&
        element[0] != "h"
      ) {
        index = gridKeys[index];
        if (element[0] == "c") {
          return gameFinish(winGrid, "c", "x");
        }
        return gameFinish(winGrid, "x", "c");
      }
    }
    if (x == 0) {
      setTimeout(() => botPlay(updatedGrid), 500);
      a = 1;
    }
  };

  const play = (position) => {
    posit = position;
    a = 0;
    /*let na = gridKeys[4]*/
    if (end1 == 0) {
      if (grid[position] == "h") {
        setGrid((prev) => ({ ...prev, [position]: selectedPlayer }));
        checkForWin(position, a);
        // Novo estado imediato
        /*setSelectedPlayer((prev) => (prev === "x" ? "c" : "x"));*/
      }
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
      <button onClick={resetGrid}>reset</button>
    </>
  );
}

export default Columns;
