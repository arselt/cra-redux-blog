import React from "react";
import { connect } from "react-redux";

import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";

const Comments = (props) => {
    
    if (props.comment_error) {
        return <Fatal message={ props.comment_error } />
    }
    
    if (props.comment_loading && !props.comments.length) {
        return <Spinner />
    }

    const placeComments = () => (
        props.comments.map((comment) => (
            <li key={comment.id}>
                <b>
                    <u>
                        { comment.email }
                    </u>
                </b>
                <p>
                    { comment.body }
                </p>
            </li>
        ))
    );

    return (
        <ul>
            { placeComments() }
        </ul>
    );
};

const mapStateToProps = ({ entriesReducer }) => entriesReducer;

export default connect(mapStateToProps)(Comments);