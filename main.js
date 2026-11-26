const username = document.getElementById("username")


const button = document.getElementById("searchBtn")

const results = document.querySelector("div p")



// we are going to write a fucntion where when the search button is clicked then the username will be saved and it has to show in the console 


// first things first when the search button is clicked so we need an eventlistener 

// before evoking the click button lets see if it shows in the console 

// we used a callback cuz when we do an action then only a function is evoked and also that function is something that we dont call ourselves so we dont need the paraenthsis 


button.addEventListener("click",displayUsername)


// this function is to display the username that we type on the webpage and then we are going save the value of the html content into a new variable inside the function 

// we need to validate the username 
// we do not allow just spaces as the username so we retun to user to type in a valid username 


function displayUsername(){
    const userInput = username.value.trim()
    if (userInput === ""){
        results.textContent = "Please enter a valid username"
        // if the username is empty then we have to use return cuz since the function should end and it should not show the profile 
        return
    }
    else{
      results.textContent = `You have searched for ${userInput}`
    }
    // we are going to create profile sample dashboard for the username we search 

    // we have learnt how to create a element just in js 
    // the steps are create element then edit its text then append it to document 

    const profileHeading = document.createElement("h2")
    profileHeading.textContent = `Profile name : ${userInput}`
    results.append(profileHeading)

    

}




