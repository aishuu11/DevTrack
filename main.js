const username = document.getElementById("username")

const button = document.getElementById("searchBtn")



// we are going to write a fucntion where when the search button is clicked then the username will be saved and it has to show in the console 


// first things first when the search button is clicked so we need an eventlistener 

// before evoking the click button lets see if it shows in the console 
button.addEventListener("click",displayUsername)


function displayUsername(){
  console.log(username.value)

}


