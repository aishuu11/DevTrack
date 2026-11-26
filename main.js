const username = document.getElementById("username")


const button = document.getElementById("searchBtn")

const results = document.querySelector("div p")



// we are going to write a fucntion where when the search button is clicked then the username will be saved and it has to show in the console 


// first things first when the search button is clicked so we need an eventlistener 

// before evoking the click button lets see if it shows in the console 
button.addEventListener("click",displayUsername)


function displayUsername(){
    const userInput = username.value
    results.textContent = `You have searched for ${userInput}`

}


