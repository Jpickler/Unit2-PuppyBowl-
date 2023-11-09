const state = [
  puppies = {},
];


const main = document.querySelector(`main`);

const getPuppyDetails = (puppyIdentifier) => {

  const individualPuppy = [];
  console.log(`this is state.puppies  ${state.puppies}`)
  for (i = 0; i < state.puppies.length; i++) {
    if (state.puppies[i].id === puppyIdentifier) {
      console.log(state.puppies[i]);
      individualPuppy.slice(state.puppies[i]);
    };
  };
  console.log(individualPuppy);
  console.log(`puppy name is: ${individualPuppy.name}`);


  // ******  create individual puppy card
  main.innerHTML = ``;
  const puppyCard = document.createElement(`div`);
  main.appendChild(puppyCard);



  cardData = `
    <h2 id="name"> Name: ${individualPuppy.name} </h2>
    <h2 id="breed"> Breed: ${individualPuppy.breed} </h2>
    <h2 id="status"> Status: ${individualPuppy.status} </h2>
    <img id="image" />
    <button type="button", id="backButton"> Back to Roster </button>
    `;

  puppyCard.innerHTML = cardData;
  const backButton = document.querySelector(`#backButton`);
  //console.log(backButton);
  backButton.addEventListener(`click`, () => {
    console.log(`button pushed`);
    getPuppyData();
  });

}; // end of get puppy details



const getPuppyData = async (event) => {
  const puppyDataResponse = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players`);
  console.log(`this is the response to the fetch: ${puppyDataResponse}`);
  const puppyDataJson = await puppyDataResponse.json();
  console.log(`this is puppyDataJSON should be in json format:  ${puppyDataJson}`);
  const puppyData = puppyDataJson.data.players;
  console.log(`this is puppyData after Json command and down to the players:  ${puppyData}`);
  state.puppies = puppyData.slice();
  console.log(`this is state.puppies after response  ${state.puppies}`);



  //  ****** create roster here 
  const rosterRender = (events) => {
    main.innerHTML = ``;
    const mainPageDisplay = main;
    const rosterDisplay = document.createElement(`h2`);
    rosterDisplay.innerText = `Roster`;
    main.appendChild(rosterDisplay);

    const rosterListDisplay = document.createElement(`ul`);
    main.appendChild(rosterListDisplay);
    console.log(`this is state.puppies just before li is created  ${state.puppies}`)

    state.puppies.forEach(element => {
      const rosterListItems = document.createElement(`li`);
      //console.log(element);
      rosterListItems.innerText = element.name;
      rosterListItems.setAttribute("id", element.id);
      rosterListDisplay.appendChild(rosterListItems);
    }); // end of list item creation
    const clickableListItmes = document.querySelectorAll(`li`);
    //console.log (clickableListItmes);
    clickableListItmes.forEach((clickableListItem) => {
      clickableListItem.addEventListener(`click`, (event) => {
        //getPuppyDetails(event.target.innerText);
        console.log(`this is state.puppies just before going to single puppy ${state.puppies}`)
        getPuppyDetails(event.target.id);
      }); // end of clickableListItems add eventlistener
    }); // end of clickablelistitems
  }; // end of rosterRender function

rosterRender();

}; // end of get puppy data function

getPuppyData();





