import React from "react";
import style from "./teamHead.module.scss";

function TeamHead() {

    if (Math.random() > 0.5){
        throw new Error()
    }

    return <h1>teamHead</h1>;
}

export default TeamHead;
