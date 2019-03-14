import {InputTextState, Action} from '../Type';

export default function inputTextReducer(
  inputTextState: InputTextState,
  action: Action,
) {
  const initialState: InputTextState = {
    inputTextSearchValue: '',
  };

  if (!inputTextState) {
    return initialState;
  }

  switch (action.type) {
    case 'UPDATE_INPUT_TEXT_SEARCH': {
      let inputTextSearchValue = action.payload;

      return {
        ...inputTextState,
        inputTextSearchValue: inputTextSearchValue,
      };
    }
    case 'RESET_INPUT_TEXT_SEARCH': {
      return {
        ...inputTextState,
        inputTextSearchValue: '',
      };
    }
    default: {
      return inputTextState;
    }
  }
}
