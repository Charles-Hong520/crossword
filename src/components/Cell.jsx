function Cell({ key,pos, letter, color = "#f0f0f0", setPosRow, setPosCol }) {

    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        fontFamily: "sans-serif",
        fontSize: "300%",
        color: "black",
        backgroundColor: color
    };
    function handleClick(e) {
        console.log(pos);
        setPosRow(pos[0]);
        setPosCol(pos[1]);
    }
    return (
        <>
            <p key={key} style={style} onClick={handleClick}> {letter} </p>
        </>
    )
}

export default Cell
