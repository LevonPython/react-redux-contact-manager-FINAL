import './style.css';
// import PeopleList from './components/PeopleList';
//</script><script type="text/babel">

const { useState, useEffect } = React;

const { Provider, useSelector, useDispatch } = ReactRedux;
const { createStore } = Redux;

// const { applyMiddleware } = Redux;
// const ReduxThunk = window.ReduxThunk.default

// Constants for action types
const constants = {
  // constants for addPerson component
  addPerson: {
    ADD_PERSON: 'ADD_PERSON',
  },
};

const initialState = {
  contacts: [
    {
      name: 'James Smith',
      age: 28,
      location: 'Frankfurt',
      phone: +492213128449,
      id: 0,
    },
    {
      name: 'Bruce Wayne',
      age: 43,
      location: 'New York',
      phone: +4812342349902,
      id: 1,
    },
    {
      name: 'Thomas Anderson',
      age: 39,
      location: 'Yerevan',
      phone: +37494998877,
      id: 2,
    },
  ],
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.addPerson.ADD_PERSON:
      return { ...state, contacts: [...state.contacts, action.payload] };
    default:
      return state;
  }
};

// Redux store
const store = createStore(reducer);
// actions
const actions = (() => {
  const addPerson = (name, age, location, phone) => {
    return {
      type: constants.addPerson.ADD_PERSON,
      payload: { name: name, age: age, location: location, phone: phone },
    };
  };
  return { addPerson };
})();

// Main App component
const App = () => {
  return (
    <Provider store={store}>
      <AddPersonForm />
      <PeopleList />
    </Provider>
  );
};

// AddPersonForm component
const AddPersonForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  function handleChangeName(name) {
    setName(name.target.value);
  }
  function handleChangeAge(age) {
    setAge(age.target.value);
  }
  function handleChangeLoc(location) {
    setLocation(location.target.value);
  }
  function handleChangePhone(phone) {
    setPhone(phone.target.value);
  }

  const handleSubmit = (e) => {
    if (name !== '' && age != '' && location != '' && phone != '') {
      console.log('NAME: ', name);
      dispatch(actions.addPerson(name, age, location, phone));
      setName('');
      setAge('');
      setLocation('');
      setPhone('');
    } else {
      alert("You can't submit a empty field(s)!");
    }
    e.preventDefault();
  };

  function Reset(e) {
    setName('');
    setAge('');
    setLocation('');
    setPhone('');
    e.preventDefault();
  }

  return (
    <form className="Create">
      {/* onSubmit={handleSubmit} */}
      <label>
        <b>Create</b>
      </label>
      <br />
      <input
        type="text"
        placeholder="Add contact name"
        onChange={handleChangeName}
        value={name}
      />
      <br />
      <input
        type="text"
        placeholder="Add Age"
        onChange={handleChangeAge}
        value={age}
      />
      <br />
      <input
        type="text"
        placeholder="Add location"
        onChange={handleChangeLoc}
        value={location}
      />
      <br />
      <input
        type="text"
        placeholder="Add phone"
        onChange={handleChangePhone}
        value={phone}
      />
      <br />
      <button type="submit" onClick={handleSubmit}>
        Add
      </button>
      <button type="submit" onClick={Reset}>
        Reset
      </button>
    </form>
  );
};

// PeopleList component
const PeopleList = () => {
  const contacts = useSelector((state) => state.contacts);
  console.log('DATA: ', contacts);
  if (contacts.length > 0) {
    const listItems = contacts.map((val, index) => (
      <li key={index} id={index}>
        <b>Name:</b>
        <input
          value={val['name']}
          className="changeContacts"
          // onChange={(e) => handleChange(e, index, 'name')}
        />
        <br />
        <span>
          <b>Age:</b>
          <input
            value={val['age']}
            className="changeContacts"
            // onChange={(e) => handleChange(e, index, 'age')}
          />
        </span>
        <br />
        <span>
          <b>Location:</b>{' '}
          <input
            value={val['location']}
            className="changeContacts"
            // onChange={(e) => handleChange(e, index, 'location')}
          />
        </span>
        <br />
        <span>
          <b>Phone:</b>{' '}
          <input
            value={val['phone']}
            className="changeContacts"
            // onChange={(e) => handleChange(e, index, 'phone')}
          />
        </span>
        <button
          className="close"
          // onClick={() => handleDeleting(index)}
        >
          <b>&#10006;</b>
        </button>
      </li>
    ));
    return (
      <container className="contact-list">
        <span id="allContacts">
          <b>All Contacts</b>
        </span>
        <ul>{listItems}</ul>
      </container>
    );
  } else {
    return <ul className="no_contacts">No Contacts found</ul>;
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
