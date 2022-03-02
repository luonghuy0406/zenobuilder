import {
    ADD_QUESTION,
  } from "./constants";
  
  let initState = {
    elements: [],
  };
  
  export function rootReducer(state = initState, action) {
    let newState = { ...state };
    try {
      switch (action.type) {
        case ADD_QUESTION:
          newState['elements'].splice(action.desIndex, 0, {type:action.typeElement});
          console.log('acccc',newState)
          
          break;
  
        
  
        default:
          break;
      }
      console.log(action, newState);
      return newState;
    } catch (e) {
      console.log(action, e);
      return newState;
    }
  }
  
  function syncStateWithLanguages(state) {
    let setting_keys = [
      "label",
      "hint",
      "required_message",
      "constraint_message",
    ];
    let newState = { ...state };
  
    newState.languages.map((language) => {
      Object.keys(newState.questionsList).map((question) => {
        setting_keys.map((key) => {
          if (
            newState.questionsList[question][`${key}::${language}`] === undefined
          ) {
            newState.questionsList[question][`${key}::${language}`] =
              newState.questionsList[question][key];
          }
        });
      });
    });
    return newState;
  }
  
  function updateChoicesList(state, languages, type) {
    if (type === "add") {
      return updateChoicesListAfterAddingLanguage(state, languages);
    } else {
      return updateChoicesListAfterRemovingLanguage(state, languages);
    }
  }
  
  function updateChoicesListAfterRemovingLanguage(state, removed_language) {
    let old_choices_list = [...state.choices_list];
    let choice_headers = [...state.choices_list[0]];
    let new_choices_list = [];
  
    if (state.languages.length === 0) {
      for (let i = 0; i < choice_headers.length; i++) {
        if (choice_headers[i].indexOf("label") > -1) {
          choice_headers[i] = "label";
        }
        if (choice_headers[i].indexOf("media::image") > -1) {
          choice_headers[i] = "media::image";
        }
      }
      old_choices_list[0] = choice_headers;
      return old_choices_list;
    }
  
    let removed_label_index = choice_headers.indexOf(
      `label::${removed_language}`
    );
    choice_headers.splice(removed_label_index, 1);
    let removed_media_image_index = choice_headers.indexOf(
      `media::image::${removed_language}`
    );
    choice_headers.splice(removed_media_image_index, 1);
    new_choices_list.push(choice_headers);
  
    for (let i = 1; i < old_choices_list.length; i++) {
      let new_choices_list_row = old_choices_list[i];
      new_choices_list_row.splice(removed_label_index, 1);
      new_choices_list_row.splice(removed_media_image_index, 1);
      new_choices_list.push(new_choices_list_row);
    }
    return new_choices_list;
  }
  
  function updateChoicesListAfterAddingLanguage(state, addable_languages) {
    let old_choices_list = [...state.choices_list];
    let new_choices_list = [];
    let new_choices_list_row = [];
    let choice_columns = [...state.choices_list[0]];
    let label_last_index = choice_columns.indexOf(
      `label::${
        state.languages[state.languages.length - addable_languages.length - 1]
      }`
    );
  
    if (label_last_index === -1) {
      for (let i = 0; i < old_choices_list.length; i++) {
        new_choices_list_row = [];
        choice_columns.map((column, column_index) => {
          if (
            (column === "label" || column === "media::image") &&
            state.languages.length > 0
          ) {
            state.languages.map((language) => {
              if (i === 0) {
                new_choices_list_row = [
                  ...new_choices_list_row,
                  `${column}::${language}`,
                ];
              } else {
                new_choices_list_row = [
                  ...new_choices_list_row,
                  old_choices_list[i][column_index],
                ];
              }
            });
          } else {
            if (i === 0) {
              new_choices_list_row = [...new_choices_list_row, column];
            } else {
              new_choices_list_row = [
                ...new_choices_list_row,
                old_choices_list[i][column_index],
              ];
            }
          }
        });
        new_choices_list.push(new_choices_list_row);
      }
    } else if (label_last_index > -1) {
      let new_headers = [];
      for (let i = 0; i < old_choices_list.length; i++) {
        new_choices_list_row = [...old_choices_list[i]];
        addable_languages.map((language, lang_index) => {
          if (i === 0) {
            new_choices_list_row.splice(
              label_last_index + lang_index + 1,
              0,
              `label::${language}`
            );
            new_headers = new_choices_list_row;
          } else {
            new_choices_list_row.splice(
              label_last_index + lang_index + 1,
              0,
              null
            );
          }
          let media_image_last_index = new_headers.indexOf(
            `media::image::${
              state.languages[
                state.languages.length - addable_languages.length - 1
              ]
            }`
          );
          if (i === 0) {
            new_choices_list_row.splice(
              media_image_last_index + lang_index + 1,
              0,
              `media::image::${language}`
            );
            new_headers = new_choices_list_row;
          } else {
            new_choices_list_row.splice(
              media_image_last_index + lang_index + 1,
              0,
              null
            );
          }
        });
        new_choices_list.push(new_choices_list_row);
      }
    }
    return new_choices_list;
  }
  
  function setAppearance(display, gridformat) {
    let gridArr = [];
    for (let prop in gridformat) {
      if (gridformat[prop] !== "") {
        gridArr = [...gridArr, `${prop} = ${gridformat[prop]}`];
      }
    }
    let gridStr = gridArr.join(", ");
    let appearance = `${display.join(" ")} gridformat<${gridStr}/>`;
    return appearance;
  }
  