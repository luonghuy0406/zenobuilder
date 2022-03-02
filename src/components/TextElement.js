import { TextField } from "@material-ui/core";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

const TextElements = (props) => {
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided, snapshot) => {
                return (
                    <div 
                        className="form-group row"
                        ref={provided.innerRef}
                        snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <TextField className="" id="standard-basic" label={"Standard "+props.index} />
                    </div>
                );
            }}
            </Draggable>
    );
};

const mapStateToProps = (state, props) => {
    return {
        ...props,
    }
};

export default connect(mapStateToProps)(TextElements);