import {
    ADD_QUESTION,
  } from "./constants";
  
  export function addNewQuestion(typeElement,desIndex) {
    return {
      type: ADD_QUESTION,
      typeElement: typeElement,
      desIndex: desIndex,
    };
  }
  
  