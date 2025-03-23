import { useState, useEffect, use } from "react";

var posit = null;
var end1 = 0;
var a = 1;

function Columns() {
  // consertar erro de registrar o ultimo apertado - CHECK
  // fazer versão 1v1
  // fazer o bot com dificuldades

  const [end, setEnd] = useState(0);

  const [winGrid, setWinGrid] = useState([]);

  const [selectedPlayer, setSelectedPlayer] = useState("x");
  const [selectedPlayerBot, setSelectedPlayerBot] = useState("c");
  const [bot, setBot] = useState(false);

  const [gridB, setGridB] = useState(1);

  const [activepvp, setActivePvp] = useState("");
  const [activepvia, setActivePvia] = useState("active");

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

  useEffect(() => {
    console.log(1);
    checkForWin(posit, a);
  }, [gridB]);

  const resetGrid = () => {
    setSelectedPlayer("x");
    for (let item = 0; item <= gridKeys.length; item++) {
      const element = gridKeys[item];

      setGrid((prev) => ({
        ...prev,
        [element]: "h",
      }));
    }
    end1 = 0;
  };

  const randomNumber = () => {
    let random = Math.floor(Math.random() * 9);
    return random;
  };

  const botPlay = (updatedGrid) => {
    console.log(1);
      console.log(4);
      let botPlayPosition = randomNumber();
      while (updatedGrid[gridKeys[botPlayPosition]] !== "h") {
        botPlayPosition = randomNumber();
      }
      const position = gridKeys[botPlayPosition];

      setGrid((prev) => ({
        ...prev,
        [position]: selectedPlayerBot,
      }));
    
    setGridB((prev) => ({ ...prev, 1: 2 }));
  };

  const gameFinish = (win, index) => {
    console.log(1);
    if (end1 == 0) {
      console.log(win);
      let indicator = "-win";
      for (let item = 0; item < gridKeys.length; item++) {
        const element = gridKeys[item];
        if (win == "draw") {
          setGrid((prev) => ({ ...prev, [element]: grid[element] + "-loss" }));
          console.log(grid[element] + " draw");
        } else {
          if (index != selectedPlayer) {
            indicator = "-loss";
          }
          if (grid[element] == index) {
            setGrid((prev) => ({ ...prev, [element]: index + indicator }));
          }
        }

        console.log(element);
      }

      console.log(grid);
      end1 = 1;
    }
  };

  const checkForWin = (position, x) => {
    console.log(1);
    let updatedGrid = grid;
    updatedGrid[position] = selectedPlayer;
    console.log(x);
    if (x == 2) {
      updatedGrid = grid;
    }

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
    if (
      Object.keys(updatedGrid).find((key) => updatedGrid[key] === "h") ==
      "undefined"
    ) {
      gameFinish("draw");
    } else {
      if (x == 0 && activepvia == "active") {
        setTimeout(() => botPlay(updatedGrid), 500);
        a = 1;
      }
      if (activepvp == "active") {
        setSelectedPlayer((prev) => (prev === "x" ? "c" : "x"));
      }
    }
  };

  const play = (position) => {
    console.log(1);
    posit = position;
    a = 0;
    /*let na = gridKeys[4]*/
    if (end1 == 0) {
      if (grid[position] == "h") {
        setGrid((prev) => ({ ...prev, [position]: selectedPlayer }));
        checkForWin(position, a);
        // Novo estado imediato
      }
    }
  };

  const activeFunction = (active) => {
    resetGrid();
    if (active == 1) {
      setActivePvia("active");
      setActivePvp("");
      return;
    }
    setActivePvp("active");
    setActivePvia("");
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
      <div className="div-reset">
        <button className="reset" onClick={resetGrid}>
          RESET
        </button>
        <br />
        <br />
        <button
          onClick={(e) => {
            activeFunction(1);
          }}
          className={"pvia " + activepvia}
        >
          1P
        </button>
        <button
          onClick={(e) => {
            activeFunction(2);
          }}
          className={"pvp " + activepvp}
        >
          2P
        </button>
        <br />
        <footer>
          <span className="title">TIC-TAC-TOE</span>

          <br />
          <span className="author">
            game developed by
            <br />
            LUCAS YAMADA
          </span>
        </footer>
      </div>
    </>
  );
}

export default Columns;
