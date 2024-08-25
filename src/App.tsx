import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [dice, setDice] = useState(6);
  const [scoreTable, setScoreTable] = useState<player[]>([]);
  const [playerCounter, setPlayerCounter] = useState(1);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [winner, setWinner] = useState<player | null>(null)

  type player = {
    name: string;
    scores: number[];
  };

  function updateCount(score: number, usedDice: number) {
    console.log(dice, score, usedDice);

    setCount(count + score);
    if (dice - usedDice === 0) {
      setDice(6);
    } else setDice(dice - usedDice);
  }

  function resetCount() {
    setCount(0);
    setDice(6);
  }

  function addPlayerToScoreTable(playerName: string) {
    const newPlayer: player = {
      name: playerName,
      scores: [],
    };

    setScoreTable([...scoreTable, newPlayer]);
    setNewPlayerName("");
  }

  function displayWinner(player: player) {
    return (
      <dialog>
        {player.name} is the winner with {player.scores[player.scores.length - 1]} points!
      </dialog>
    )
  }

  function addPointsToPlayer(score: number) {
    const targetPlayer = scoreTable[playerCounter - 1];
    const tPScores = targetPlayer.scores;
    let tPCurrentScore = tPScores[tPScores.length - 1];
    console.log(tPCurrentScore);
    if (tPCurrentScore === undefined) tPCurrentScore = 0;
    targetPlayer.scores.push(score + tPCurrentScore);

    if (tPScores[tPScores.length - 1] >= 10000) setWinner(targetPlayer)

    setPlayerCounter(
      playerCounter === scoreTable.length ? 1 : playerCounter + 1
    );
    setCount(0);
    setDice(6);
  }

  function displayScoreButtons(dice: number) {
    if (dice < 3)
      return (
        <div id="all-score-buttons">
          <div id="singles-buttons">
            <button onClick={() => updateCount(100, 1)}>1 1</button>
            <button onClick={() => updateCount(50, 1)}>1 5</button>
          </div>
        </div>
      );

    if (dice < 4)
      return (
        <div id="all-score-buttons">
          <div id="singles-buttons">
            <button onClick={() => updateCount(100, 1)}>1 1</button>
            <button onClick={() => updateCount(50, 1)}>1 5</button>
          </div>
          <div id='threes-buttons'>
            <button onClick={() => updateCount(300, 3)}>3 1s</button>
            <button onClick={() => updateCount(200, 3)}>3 2s</button>
            <button onClick={() => updateCount(300, 3)}>3 3s</button>
            <button onClick={() => updateCount(400, 3)}>3 4s</button>
            <button onClick={() => updateCount(500, 3)}>3 5s</button>
            <button onClick={() => updateCount(600, 3)}>3 6s</button>
          </div>
        </div>
      );

    if (dice < 5) {
      return (
        <div id="all-score-buttons">
          <div id="singles-buttons">
            <button onClick={() => updateCount(100, 1)}>1 1</button>
            <button onClick={() => updateCount(50, 1)}>1 5</button>
          </div>
          <div id='threes-buttons'>
            <button onClick={() => updateCount(300, 3)}>3 1s</button>
            <button onClick={() => updateCount(200, 3)}>3 2s</button>
            <button onClick={() => updateCount(300, 3)}>3 3s</button>
            <button onClick={() => updateCount(400, 3)}>3 4s</button>
            <button onClick={() => updateCount(500, 3)}>3 5s</button>
            <button onClick={() => updateCount(600, 3)}>3 6s</button>
          </div>
          <div>
            <button onClick={() => updateCount(1000, 4)}>
              Four of a kind
            </button>
          </div>
        </div>
      );
    }

    if (dice < 6) {
      return (
        <div id="all-score-buttons">
          <div id="singles-buttons">
            <button onClick={() => updateCount(100, 1)}>1 1</button>
            <button onClick={() => updateCount(50, 1)}>1 5</button>
          </div>
          <div id='threes-buttons'>
            <button onClick={() => updateCount(300, 3)}>3 1s</button>
            <button onClick={() => updateCount(200, 3)}>3 2s</button>
            <button onClick={() => updateCount(300, 3)}>3 3s</button>
            <button onClick={() => updateCount(400, 3)}>3 4s</button>
            <button onClick={() => updateCount(500, 3)}>3 5s</button>
            <button onClick={() => updateCount(600, 3)}>3 6s</button>
          </div>
          <div>
            <button onClick={() => updateCount(1000, 4)}>
              Four of a kind
            </button>
            <button onClick={() => updateCount(2000, 5)}>
              Five of a kind
            </button>
          </div>
        </div>
      );
    } else
      return (
        <div id="all-score-buttons">
          <div id="singles-buttons">
            <button onClick={() => updateCount(100, 1)}>1 1</button>
            <button onClick={() => updateCount(50, 1)}>1 5</button>
          </div>
          <div id='threes-buttons'>
            <button onClick={() => updateCount(300, 3)}>3 1s</button>
            <button onClick={() => updateCount(200, 3)}>3 2s</button>
            <button onClick={() => updateCount(300, 3)}>3 3s</button>
            <button onClick={() => updateCount(400, 3)}>3 4s</button>
            <button onClick={() => updateCount(500, 3)}>3 5s</button>
            <button onClick={() => updateCount(600, 3)}>3 6s</button>
          </div>
          <div>
            <button onClick={() => updateCount(1000, 4)}>
              Four of a kind
            </button>
            <button onClick={() => updateCount(2000, 5)}>
              Five of a kind
            </button>
            <button onClick={() => updateCount(3000, 6)}>
              Six of a kind
            </button>
          </div>
          <div>
            <button onClick={() => updateCount(1500, 6)}>1–6 straight</button>
            <button onClick={() => updateCount(1500, 6)}>XX - YY - ZZ</button>
            <button onClick={() => updateCount(1500, 6)}>
              XXXX - YY
            </button>
            <button onClick={() => updateCount(2500, 6)}>XXX - YYY</button>
          </div>
        </div>
      );
  }

  function theScoreTable() {
    return scoreTable.map((player, index) => {
      const playerScores = player.scores.map((score, scoreIndex) => {
        return <p key={scoreIndex}>{score}</p>;
      });

      return (
        <div className="one-player-scores" key={index}>
          <h3>{player.name}</h3>
          <div>{playerScores}</div>
        </div>
      );
    });
  }

  console.log("playerCounter", playerCounter);
  console.log(count);
  console.log(scoreTable);

  return (
    <>
      <main>
        <h1>Farkulator</h1>
        <h3>a calculator and scorekeeper for Farkle</h3>
        {winner != null ? displayWinner(winner) : ""}
        <div id="score-count-flex">
          <div>
            <button id="reset" onClick={() => resetCount()}>
              RESET
            </button>
            <button id="farkle" onClick={() => addPointsToPlayer(0)}>
              FARKLE!
            </button>
          </div>
          <p id="count-display">{count}</p>
          <button id="done" onClick={() => addPointsToPlayer(count)}>
            I'm done!
          </button>
        </div>

        {displayScoreButtons(dice)}
        <div>
          <h2>Scores:</h2>
          <div id='score-table'>{scoreTable.length > 0 ? theScoreTable() : <p>No players added yet.</p>}</div>
        </div>
        <div id='add-a-player'>
          <h3>add a player to the game:</h3>
          <input
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="player name"
          />
          <button onClick={() => addPlayerToScoreTable(newPlayerName)}>
            Add Player
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
