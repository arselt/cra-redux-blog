import React from "react";

const Fatal = (props) => (
    <div className="center">
        <h1 style={{fontSize: 72 + 'px'}}>
        🤕
        </h1>
        <h2>
            {props. message}
        </h2>
    </div>
);

export default Fatal;