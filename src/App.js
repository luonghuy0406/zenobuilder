import './App.css';
import { connect, useDispatch, useSelector } from "react-redux";
import React, { useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {
  addNewQuestion,
} from "./actions";
import TextElement from './components/TextElement';
import SelectOneElement from './components/SelectOneElement';

const useStyles = makeStyles((theme) => ({
  first_nav: {
    padding: "15px",
  },
  second_nav: {
    // backgroundColor: "#31aa73",
    top: 0,
    backgroundColor: "#ffffff",
    // position: "fixed",
    zIndex: 999,
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    // color: "#ffffff",
    // padding: theme.spacing(2),
  },
  logo: {
    paddingLeft: "15px",
  },
  main: {
    marginTop: "70px",
  },
  form_page: {
    marginTop: "30px",
    marginBottom: "70px",
    width: "100%",
  },
  form_page2: {
    width: "100%",
    marginTop: "10px",
    border: "1px solid #000"
  },
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
}));


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App(props) {
  console.log('prosp',props)
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const dispatch = useDispatch();
  // using useCallback is optional
  const onBeforeCapture = useCallback((e) => {
    console.log('>>>>>>>>onBeforeCapture',e)
  }, []);
  const onBeforeDragStart = useCallback((e) => {
    // console.log('>>>>>>>>onBeforeDragStart',e)
  }, []);
  const onDragStart = useCallback((e) => {
    // console.log('>>>>>>>>onDragStart',e)
  }, []);
  const onDragUpdate = useCallback((e) => {
    // console.log('>>>>>>>>onDragUpdate',e)
  }, []);
  const onDragEnd = useCallback((result) => {
    if(result.source.droppableId == "droppable-element" && result.destination.droppableId == "droppable-workspace" ){
      dispatch(addNewQuestion(result.draggableId,result.destination.index));
      console.log(result);
    }
    
  }, []);
  return (
    <div className="App">
      <DragDropContext
        onBeforeCapture={onBeforeCapture}
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.second_nav}
        >
          <Grid item className={classes.logo}>
            <img
              src="./../html.png"
              style={{ height: "35px" }}
            />
          </Grid>
          <Grid item>
            <Tabs
              value={0}
              // onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="inherit"
            >
              <Tab label="Desktop" {...a11yProps(0)} />
              <Tab label="Tablet" {...a11yProps(1)} />
              <Tab label="Mobile" {...a11yProps(2)} />
              
            </Tabs>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Download HTML
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item lg={3} md={3} xs>
            <Card className={classes.form_page}>
              <Grid item lg={12} md={12} xs>
                <Tabs
                  value={0}
                  indicatorColor="primary"
                  textColor="primary"
                  // onChange={handleChange}
                  aria-label="disabled tabs example"
                  variant="fullWidth"
                >
                  <Tab label="Element" {...a11yProps(0)}/>
                  <Tab label="Setting" {...a11yProps(1)}/>
                </Tabs>
              </Grid>
              <Grid item lg={12} md={12} xs>
                <Card className={classes.form_page2}>
                  
                <Droppable droppableId="droppable-element" isDropDisabled>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Draggable draggableId={"Text"} index={1}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          snapshot={snapshot}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span>Text</span>
                        </div>
                      );
                    }}
                  </Draggable>
                  <Draggable draggableId={"Select-one"} index={2}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          snapshot={snapshot}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span>Select one</span>
                        </div>
                      );
                    }}
                  </Draggable>
                </div>
              )}
            </Droppable>
                </Card>
              </Grid>
            </Card>
          </Grid>
          <Grid item lg={9} md={9} xs>
            {/* <Droppable> */}
            <Card className={classes.form_page}>
                
              <CardContent>
              <Droppable droppableId="droppable-workspace">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    props.elements.map((el,index) =>{
                      
                      if(el.type =="Select-one"){
                        return(
                          <SelectOneElement
                            key = {"key-"+index}
                            id={"id-"+index}
                            index={index}
                          />
                        )
                      }
                      return(
                        <TextElement
                          key = {"key-"+index}
                          id={"id-"+index}
                          index={index}
                        />
                      )
                      
                      
                    })
                  }
                    
                </div>
              )}
            </Droppable>
              
              </CardContent>
            </Card>
            {/* </Droppable> */}
            
          </Grid>
        </Grid>

        

      </DragDropContext>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(App);
