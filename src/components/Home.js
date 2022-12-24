import logo from "../logo.svg";
import "../App.css";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import React, { useState, useEffect, useMemo, useReducer } from "react";

const initializeData = {
  newData: [
    {
      name: "ARTURO",
      id: 23432,
    },
    {
      name: "ARTUR",
      id: 6457645,
    },
  ],
};

function Home() {
  const [counter, setCounter] = useState(1);

  const [usersData, setUsersData] = useState([]);

  const [menu, setMenu] = useState(initializeData);

  const [search, setSearch] = useState("");

  const hadleSearch = (event) => {
    setSearch(event.target.value);
  };

  const initialState = {
    favorites: [],
  };

  const favoriteReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_FAVORITE":
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      default:
        return state;
    }
  };

  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  const filteredUsers = useMemo(
    () =>
      usersData.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, usersData]
  );

  const updateState = () => {
    const addData = {
      name: "Melina",
      id: 7654,
    };

    setMenu((previousMenu) => {
      return {
        newData: [...previousMenu.newData, addData],
      };
    });
  };

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(({ data }) => {
        // handle success
        setUsersData(data.results);
        console.log(data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <div className="App">
      <p>Arturo's project</p>

      <p>Counter: {counter}</p>

      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increase counter
      </button>

      <p>FAVORITES</p>

      {favorites.favorites.map((favorite) => {
        return <li key={favorite.id}>{favorite.name}</li>;
      })}

      <p>--------------------------</p>

      <label>
        Search characters:
        <input onChange={hadleSearch} type="text" name="input_character" />
      </label>

      <center style={{ marginTop: 20, marginBottom: 20, justifyContent: "center", alignSelf: "center" }}>
        {menu.newData.map((data) => {
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>{data.name}</p>
              <p>{data.id}</p>
            </div>
          );
        })}

        <button onClick={() => updateState()} type="button">
          Update State
        </button>
      </center>

      {filteredUsers.map((user) => (
        <div key={user.id}>
          <h2 key={user.id}>{user.name}</h2>
          <button onClick={() => handleClick(user)} type="button">
            Add to favorite
          </button>
        </div>
      ))}

      <div style={{ paddingTop: 80, paddingBottom: 80 }}>
        <center>
          <Container>
            <Row>
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src="https://i.pravatar.cc/300" />
                  <Card.Body>
                    <Row
                      style={{
                        display: "flex",
                        alignContent: "flex-start",
                        alignItems: "center",
                        marginLeft: "0px",
                        marginBottom: 20,
                        marginTop: 10,
                      }}
                    >
                      <Card.Img
                        src={`https://i.pravatar.cc/300`}
                        style={{
                          width: "80px",
                          height: "80px",
                        }}
                        alt="Card image"
                      />

                      <Col style={{ alignSelf: "flex-start", width: 2000 }}>
                        <p
                          style={{
                            fontSize: "16px",
                            alignSelf: "flex-start",
                            color: "#6074DD",
                            fontFamily: "Poppins",
                            fontWeight: 700,
                            lineHeight: "24px",
                            marginBottom: "0px",
                            paddingBottom: 0,
                          }}
                        >
                          {"ARTURO"}
                        </p>
                        <Card.Text
                          style={{
                            fontSize: "14px",
                            color: "#969696",
                            fontFamily: "Poppins",
                            fontWeight: 400,
                            lineHeight: "21px",
                          }}
                        >
                          2 questions - 1 answer
                        </Card.Text>
                      </Col>
                    </Row>

                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col>2 of 2</Col>
            </Row>
            <Row>
              <Col>1 of 3</Col>
              <Col>2 of 3</Col>
              <Col>3 of 3</Col>
            </Row>
          </Container>
        </center>
      </div>
    </div>
  );
}

export default Home;
