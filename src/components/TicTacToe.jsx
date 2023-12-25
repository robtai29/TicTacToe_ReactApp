import Board from "./Board";
import { useState, useEffect } from "react";
import GameState from "./GameState";
import GameOver from "./GameOver";
import Reset from "./Reset";

function TicTacToe(){
    const PLAYER_X = "x";
    const PLAYER_O = "o";
    const winningCombination = [
        //rows
        {combo: [0, 1, 2], strikeClass: "strike-row-1"},
        {combo: [3, 4, 5], strikeClass: "strike-row-2"},
        {combo: [6, 7, 8], strikeClass: "strike-row-3"},

        //columns
        {combo: [0, 3, 6], strikeClass: "strike-column-1"},
        {combo: [1, 4, 7], strikeClass: "strike-column-2"},
        {combo: [2, 5, 8], strikeClass: "strike-column-3"},

        //diagnoal
        {combo: [0, 4, 8], strikeClass: "strike-diagonal-1"},
        {combo: [6, 4, 2], strikeClass: "strike-diagonal-2"},
    ];

    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_O);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);
    useEffect(()=>{
        checkWinner();
    }
    , [tiles]);

    function checkWinner(){
        for (const {combo, strikeClass} of winningCombination){
            const tileValue1 = tiles[combo[0]];
            const tileValue2 = tiles[combo[1]];
            const tileValue3 = tiles[combo[2]];

            if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3){
                setStrikeClass(strikeClass);
                if (tileValue1 === PLAYER_O){
                    setGameState(GameState.playerOWins);
                }else{
                    setGameState(GameState.playerXWins);
                }
                return;
            }
        }

        const allTilesFilled = tiles.every((tile) => tile !== null);
        if (allTilesFilled){
            setGameState(GameState.draw);
        }
    }

    const handleTileClick = (index) => {
        if (gameState !== GameState.inProgress){
            return;
        }
        if (tiles[index] != null){
            return;
        }
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);

        if (playerTurn === PLAYER_O){
            setPlayerTurn(PLAYER_X);
        }else{
            setPlayerTurn(PLAYER_O);
        }
    };

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setPlayerTurn(PLAYER_O);
        setStrikeClass(null);
        const newTiles = Array(9).fill(null);
        setTiles(newTiles);
    };


    return (
        <>
        <div>
            <h1>TicTacToe</h1>
            <Board strikeClass={strikeClass} tiles={tiles} onTileClick={handleTileClick} playerTurn={playerTurn}/>
            <GameOver gameState={gameState}/>
            <Reset gameState={gameState} onReset={handleReset}/>
        </div>
        </>

    )

}
export default TicTacToe;