import GameState from "./GameState";
function GameOver({gameState}){
    switch (gameState){
        case GameState.playerXWins:
            return <div className="game-over">Player x wins</div>;
        case GameState.playerOWins:
            return <div className="game-over">Player o wins</div>;
        case GameState.draw:
            return <h3>draw</h3>
        case GameState.inProgress:
            return <></>;
        default:
            return <></>;
    }
}

export default GameOver;



