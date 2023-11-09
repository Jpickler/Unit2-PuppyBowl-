const state = {
  puppies: []
};

const main = document.querySelector(`main`);



const getPuppyDetails = async (puppyIdentifier) => {

  let individualPuppy = [];

  for (i = 0; i < state.puppies.length; i++) {
    if (puppyIdentifier == state.puppies[i].id) {
      individualPuppy = state.puppies[i];
    };
  };


  // ******  create individual puppy card
  main.innerHTML = ``;
  const puppyCard = document.createElement(`div`);
  puppyCard.setAttribute("style", "display: flex; justify-content: space-between; border-style: solid; border-color:black;height: 300px; width:500px; margin:10px;");
  main.appendChild(puppyCard);

  cardData = `
    <div style="align-self: center">
    <h2 id="name"> Name: ${individualPuppy.name} </h2>
    <h2 id="breed"> Breed: ${individualPuppy.breed} </h2>
    <h2 id="status"> Status: ${individualPuppy.status} </h2>
    </div>
    <img id="image" src="${individualPuppy.imageUrl}" width=200px />
    `;

  puppyCard.innerHTML = cardData;
  const backButton = document.createElement(`button`);
  backButton.textContent = `Return to Roster`;
  main.appendChild(backButton);
  backButton.addEventListener(`click`, () => {
    getPuppyData();
  });
}; // end of get puppy details



const getPuppyData = async (event) => {
  try {
    const puppyDataResponse = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players`);
    const puppyDataJson = await puppyDataResponse.json();
    const puppyData = puppyDataJson.data.players;
    state.puppies = puppyData.slice();
  } catch (err) {
    console.log(`the database is unaccessible at this time`);
  }



  //  ****** create roster here 
  const rosterRender = (events) => {
    main.innerHTML = ``;
    const mainPageDisplay = main;
    const rosterDisplay = document.createElement(`h2`);
    rosterDisplay.innerText = `Roster`;
    main.appendChild(rosterDisplay);

    const rosterListDisplay = document.createElement(`ul`);
    main.appendChild(rosterListDisplay);

    state.puppies.forEach(element => {
      const rosterListItems = document.createElement(`li`);
      rosterListItems.innerText = element.name;
      rosterListItems.setAttribute("id", element.id);
      rosterListDisplay.appendChild(rosterListItems);
    }); // end of list item creation
    const clickableListItmes = document.querySelectorAll(`li`);
    clickableListItmes.forEach((clickableListItem) => {
      clickableListItem.addEventListener(`click`, (event) => {
        //getPuppyDetails(event.target.innerText);
        //console.log(`this is state.puppies just before going to single puppy `,state.puppies)
        getPuppyDetails(event.target.id);
      }); // end of clickableListItems add eventlistener
    }); // end of clickablelistitems
  }; // end of rosterRender function

  rosterRender();

}; // end of get puppy data function


// ***********form data here ****************


const submitTheForm = async (event) => {

  console.log(`form submitted`);
  const newPuppyName = document.querySelector("#inputNewPuppyName").value;
  const newPuppyBreed = document.querySelector("#inputNewPuppyBreed").value;
  let newPuppyStatus = document.querySelector("#inputNewPuppyStatus").value;
  if (newPuppyStatus == "field") {
    newPuppyStatus = `field`;
  }else{
    newPuppyStatus= `bench`;
  };
  const newPuppyImage = document.querySelector("#inputNewPuppyImage").value;

  try {
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players', {
      
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newPuppyName,
          breed: newPuppyBreed,
          status: newPuppyStatus,
          imageUrl: newPuppyImage,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }

  getPuppyData();

};


const formSubmit = document.querySelector(`form`);

formSubmit.addEventListener(`submit`, (event) => {
  event.preventDefault();
  submitTheForm();
});

getPuppyData();





