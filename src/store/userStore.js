
import { createStore, combineReducers } from 'redux';


// Initial User Reducer
const initialUserState = {
  name: "John Doe",
  image: "/images/avatar-men.png",
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { 
        ...state, 
        name: action.payload.name, 
        image: action.payload.image 
      };
    default:
      return state;
  }
};

// Contact Reducer
const initialContactState = {
  contact_list: [
    { "id": 1, "name": "Suttida", "age": 26 },
    { "id": 2, "name": "Ananya", "age": 24 },
    { "id": 3, "name": "Krit", "age": 31 },
    { "id": 4, "name": "Nicha", "age": 29 },
    { "id": 5, "name": "Thanakorn", "age": 27 },
    { "id": 6, "name": "Ploy", "age": 23 },
    { "id": 7, "name": "Manit", "age": 34 },
    { "id": 8, "name": "Chalita", "age": 22 },
    { "id": 9, "name": "Apichat", "age": 28 },
    { "id": 10, "name": "Pat", "age": 25 },
    { "id": 11, "name": "Viroon", "age": 30 },
    { "id": 12, "name": "Aom", "age": 21 },
    { "id": 13, "name": "Boonmee", "age": 35 },
    { "id": 14, "name": "Thida", "age": 33 },
    { "id": 15, "name": "Somchai", "age": 26 },
    { "id": 16, "name": "Pim", "age": 24 },
    { "id": 17, "name": "Chatree", "age": 32 },
    { "id": 18, "name": "Nan", "age": 20 },
    { "id": 19, "name": "Pong", "age": 29 },
    { "id": 20, "name": "Rattana", "age": 25 },
    { "id": 21, "name": "Siri", "age": 31 },
    { "id": 22, "name": "Aroon", "age": 23 },
    { "id": 23, "name": "May", "age": 28 },
    { "id": 24, "name": "Supachai", "age": 27 },
    { "id": 25, "name": "Kamala", "age": 22 },
    { "id": 26, "name": "Lek", "age": 34 },
    { "id": 27, "name": "Dao", "age": 30 },
    { "id": 28, "name": "Winai", "age": 33 },
    { "id": 29, "name": "Ying", "age": 21 },
    { "id": 30, "name": "Kanya", "age": 26 }
  ],
};

const contactReducer = (state = initialContactState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contact_list: [...state.contact_list, action.payload],
      };
    case 'REMOVE_CONTACT':
      return {
        ...state,
        contact_list: state.contact_list.filter((_, index) => _.id !== action.payload),
      };
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
});

// Create Redux Store
const store = createStore(rootReducer);

export default store;

