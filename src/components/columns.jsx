import { useState, useEffect, use } from "react";

function Columns() {
  const [end, setEnd] = useState(0);

  /*
  PRA FAZER O WIN PARA DE VEZ O JOGO E O BOT NÂO JOGAR MAIS E ETC E O BOT CONSEGUIR GANHAR TAMBÈM
  useEffect(() => {
    
  } ,[grid])*/

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
    const newWinGrid = [
      /* HORIZONTAL LINES */
      [grid.topLeft, grid.topMiddle, grid.topRight],
      [grid.middleLeft, grid.middleMiddle, grid.middleRight],
      [grid.bottomLeft, grid.bottomMiddle, grid.bottomRight],

      /* DIAGONALS */
      [grid.topLeft, grid.middleMiddle, grid.bottomRight],
      [grid.topRight, grid.middleMiddle, grid.bottomLeft],

      /* VERTICAL LINES */
      [grid.topLeft, grid.middleLeft, grid.bottomLeft],
      [grid.topMiddle, grid.middleMiddle, grid.bottomMiddle],
      [grid.topRight, grid.middleRight, grid.bottomRight],
    ];

    setWinGrid(newWinGrid);
    checkForWin(newWinGrid);
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
    checkForWin();
  };

  const gameFinish = (win, index) => {
    console.log(grid)
    setEnd(1)
  };

  const checkForWin = () => {
    for (let index = 0; index < winGrid.length; index++) {
      const element = winGrid[index];
      if (
        element[0] == element[1] &&
        element[0] == element[2] &&
        element[0] != "h"
      ) {
        return gameFinish(winGrid, index);
      }
    }
  };

  const play = (position) => {
    /*let na = gridKeys[4]*/
    if (end == 0) {
      if (grid[position] == "h") {
        setGrid((prev) => ({ ...prev, [position]: selectedPlayer }));

        const updatedGrid = grid;
        updatedGrid[position] = selectedPlayer;

        setTimeout(() => botPlay(updatedGrid), 500); // Novo estado imediato
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
    </>
  );
}

export default Columns;
