/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    let curr = 0;
    for(curr in games)
    {
        // create a new div element, which will become the game card
        let new_div = document.createElement("div");
        
        // add the class game-card to the list
        new_div.className = "game-card";

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        new_div.innerHTML = `<img src="${games[curr].img}" class="game-img"> <b><div class = "text-in-game-card">${games[curr].name}</div></b><div class = "text-in-game-card">${games[curr].description}</div><div>Backers : ${games[curr].backers}</div>`;

        // append the game to the games-container
        gamesContainer.append(new_div)
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// set the inner HTML using a template literal and toLocaleString to get a number with commas
let s = 0
contributionsCard.innerHTML = GAMES_JSON.reduce((s, GAMES_JSON) => {return s + GAMES_JSON.backers}, 0).toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
s = 0;
raisedCard.innerHTML = GAMES_JSON.reduce((s, GAMES_JSON) => {return s + GAMES_JSON.pledged}, 0).toLocaleString('en-US', {style:"currency", currency:"USD"});


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
s = 0;
gamesCard.innerHTML = GAMES_JSON.reduce((s) => {return s + 1}, 0).toLocaleString('en-US');


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unFundedList = GAMES_JSON.filter((GAMES_JSON) => {return GAMES_JSON["pledged"] < GAMES_JSON["goal"]});

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unFundedList);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedList = GAMES_JSON.filter((GAMES_JSON) => {return GAMES_JSON["pledged"] > GAMES_JSON["goal"]});

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedList);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numUnfundedGames = GAMES_JSON.filter((GAMES_JSON) => {return GAMES_JSON["pledged"] < GAMES_JSON["goal"]}).length;

// create a string that explains the number of unfunded games using the ternary operator
s = 0;
let totalRaised = GAMES_JSON.reduce((s, GAMES_JSON) => {return s + GAMES_JSON.pledged}, 0).toLocaleString('en-US', {style:"currency", currency:"USD"});
s = 0;
let numTotalGames = GAMES_JSON.reduce((s) => {return s + 1}, 0).toLocaleString('en-US');
let displayStr = `A total of ${totalRaised} has been raised for ${numTotalGames} ${numTotalGames > 1 ? "games" : "game"}. Currently, ${numUnfundedGames} ${numUnfundedGames > 1 ? "games" : "game"} remains unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const descriptionStrElt = document.createElement("div");
descriptionStrElt.className = "section-intro";
descriptionStrElt.innerHTML = displayStr;
document.getElementById("description-container").append(descriptionStrElt);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [funded1, funded2, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const mostFundedGame = document.createElement("div")
mostFundedGame.innerHTML = funded1.name;
firstGameContainer.append(mostFundedGame);

// do the same for the runner up item
const secondMostFundedGame = document.createElement("div")
secondMostFundedGame.innerHTML = funded2.name;
secondGameContainer.append(secondMostFundedGame);