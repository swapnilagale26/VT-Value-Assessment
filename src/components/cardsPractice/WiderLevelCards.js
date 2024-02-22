import React, { useState } from "react";
import { Row, Card } from "react-bootstrap";
import OuterLevelCard from "./OuterLevelCards";

import "../../components/common.scss";




const WiderLevelCards = () => {

    const LIMIT = 8;

const [selectedCards, setSelectedCards] = useState([]);

const handleCardClick = (item, isSelectedItem) =>{

    isSelectedItem ? setSelectedCards(selectedCards.filter((i)=>i.name!==item.name)) : setSelectedCards([ ...selectedCards, item]);
}
console.log(selectedCards);


const card = [
    {
        name: "anc",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 10,
            moon: 10,
            mercury: 2,
            venus: 1,
        }
    },
    {
        name: "anc1",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 10,
            moon: 10,
            mercury: 12,
            venus: 21,
        }
    },
    {
        name: "anc2",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 10,
            moon: 10,
            mercury: 12,
            venus: 0,
        }
    },
    {
        name: "anc3",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 10,
            moon: 10,
            mercury: 2,
            venus: 1,
        }
    },
    {
        name: "anc4",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 10,
            moon: 10,
            mercury: 12,
            venus: 1,
        }
    },
    {
        name: "anc5",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 10,
            moon: 10,
            mercury: 12,
            venus: 1,
        }
    },
    {
        name: "anc6",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 10,
            moon: 10,
            mercury: 0,
            venus: 0,
        }
    },
    {
        name: "anc7",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 0,
            moon: 0,
            mercury: 0,
            venus: 0,
        }
    },
    {
        name: "anc8",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 0,
            moon: 0,
            mercury: 0,
            venus: 0,
        }
    },
    {
        name: "anc9",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 0,
            moon: 0,
            mercury: 0,
            venus: 0,
        }
    },
    {
        name: "anc10",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 0,
            moon: 0,
            mercury: 0,
            venus: 0,
        }
    },
    {
        name: "anc11",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 0,
            moon: 0,
            mercury: 0,
            venus: 0,
        }
    },
    {
        name: "anc12",
        decription: "Some quick example text to build on the card title and make up  bulk of the card's content.",
        planets: {
            sun: 0,
            moon: 0,
            mercury: 0,
            venus: 0,
        }
    },
];
const cardsPractice = card.map((item, index) => {
const isSelectedItem = selectedCards.some((i)=>i.name==item.name);
    return(
        <Card className={ `${isSelectedItem ? "selectCard" : ""}`}  onClick = {() => handleCardClick(item, isSelectedItem)}>
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            {item.decription}
          </Card.Text>
        </Card.Body>
      </Card>
    );
});

const continueHandler = () =>{
    console.log()
} 

  return (
    <>
    {cardsPractice}
    <button disabled = {LIMIT !== selectedCards.length} onClick={continueHandler}> Continue </button>
    <OuterLevelCard cardRender = {selectedCards} />
    </>  
    )

};

export default WiderLevelCards;
