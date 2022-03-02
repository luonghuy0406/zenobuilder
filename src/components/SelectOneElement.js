import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

const SelectOneElement = (props) => {
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
                        <FormLabel component="legend">{props.id}</FormLabel>
                        <RadioGroup aria-label="gender" name={"radio-"+props.id} value={"female"} >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
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

export default connect(mapStateToProps)(SelectOneElement);