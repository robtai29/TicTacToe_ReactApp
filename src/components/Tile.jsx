
function Tile({className, value, onClick, playerTurn}){
    let hooverClass = null;
    if (value == null && playerTurn != null){
        hooverClass = `${playerTurn}-hover`;
    }

    return (<>
         <div onClick={onClick} className={`tile ${className} ${hooverClass}`}>{value}</div>

    </>)
}

export default Tile;