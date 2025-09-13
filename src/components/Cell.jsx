import { useEffect, useState } from 'react'
function Cell({ id, letter, color = "#f0f0f0"}) {

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

    return (
        <>
            <p key={id} style={style}> {letter} </p>
        </>
    )
}

export default Cell
