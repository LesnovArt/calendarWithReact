import React from "react";
import TeamHead from "../teamHead/teamHead";
import TeamBody from "../teamBody/teamBody";
import style from "./tableBody.module.scss";

function TableBody() {

    return (
        <>
            <h1>tableBody</h1>
                <TeamHead/>
                <TeamBody/>
        </>
    );
}

export default TableBody;
