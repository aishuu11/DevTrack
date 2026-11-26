const username = document.getElementById("username")


const button = document.getElementById("searchBtn")

const results = document.querySelector("div p")

const repos = document.getElementById("Repos")

// we are going to write a fucntion where when the search button is clicked then the username will be saved and it has to show in the console 


// first things first when the search button is clicked so we need an eventlistener 

// before evoking the click button lets see if it shows in the console 

// we used a callback cuz when we do an action then only a function is evoked and also that function is something that we dont call ourselves so we dont need the paraenthsis 


button.addEventListener("click",displayUsername)
// button.addEventListener("click",getApi)


// this function is to display the username that we type on the webpage and then we are going save the value of the html content into a new variable inside the function 

// we need to validate the username 
// we do not allow just spaces as the username so we retun to user to type in a valid username 


// the next step is to fetch real api and return it 
async function getApi(userInput) {
    const response= await fetch(`https://api.github.com/users/${userInput}`)
    if (!response.ok){  
      const noUserFound = document.createElement("h2")
      noUserFound.textContent= "No User found"
      results.append(noUserFound)
      return 
    }
  
    else{
      console.log("It fetched the response")
      const parsedResponse = await response.json()
      console.log(parsedResponse.avatar_url)
      
      return parsedResponse
    }


}

// we are going to now loop through this dictionary from the parsedResponse so we can get what we want exactly 

function getAvatar(parsedResponse){

    let Avatar_Pic = document.createElement("img")
    Avatar_Pic.src=parsedResponse.avatar_url
    Avatar_Pic.width=250
    results.append(Avatar_Pic)
}


function displayName(response){
    const profileName = document.createElement("h2")
    // if statement carries the bad case 
    if (response.name == null){
      profileName.textContent = "Profile name : Name not provided "
    }
    else{
      profileName.textContent = `Profile name : ${response.name}`
    }

    results.append(profileName)

}


function displayRepo(parsedResponse){
  const totalRepo = document.createElement("h2")
  totalRepo.textContent = `Public Repo : ${parsedResponse.public_repos}`
  results.append(totalRepo)
}

function displaybio(parsedResponse){
  const bio = document.createElement("h2")
  if (parsedResponse.bio==null){
    bio.textContent = `No Bio provided`
  }
  else{
    bio.textContent = `Bio : ${parsedResponse.bio}`
  }
  results.append(bio)
}

function displayfollowers(parsedResponse){
  const followers = document.createElement("h2")
  followers.textContent = `Followers : ${parsedResponse.followers}`
  results.append(followers)
}

function displayfollowing(parsedResponse){
  const following = document.createElement("h2")
  following.textContent = `Following : ${parsedResponse.following}`
  results.append(following)
}

async function displayReposList(parsedResponse){
  const response = await fetch (parsedResponse.repos_url)

  if (!response){
    console.log("Did not fetch repos")
  }

 else{
    console.log("Repo fetched")
    const repo_data = await response.json()

    const repo_list = document.createElement("ol")

    for (const eachDict of repo_data) {
        const item = document.createElement("li")
        item.textContent = eachDict.name
        repo_list.append(item)
    }

    repos.append(repo_list)
}
    

}



async function displayUsername(){
    const userInput = username.value.trim()
    results.textContent = ""
    repos.textContent = ""
    if (userInput === ""){
        results.textContent = "Please enter a valid username"
        // if the username is empty then we have to use return cuz since the function should end and it should not show the profile 
        return

    }
    else{
      // results.textContent = `You have searched for ${userInput}`
      const parsedResponse = await getApi(userInput)
      if (!parsedResponse){
        return}
      
      else{
        console.log(parsedResponse)
        displayName(parsedResponse)
        displaybio(parsedResponse)
        displayfollowers(parsedResponse)
        displayfollowing(parsedResponse)
        displayRepo(parsedResponse)
        getAvatar(parsedResponse)
        displayReposList(parsedResponse)
        
        
      }
      

    }
    // we are going to create profile sample dashboard for the username we search 

    // we have learnt how to create a element just in js 
    // the steps are create element then edit its text then append it to document 

    // const profileHeading = document.createElement("h2")
    // profileHeading.textContent = `Profile name : ${userInput}`
    // results.append(profileHeading)
}
// okay so what we learned is to call a function inside another function and also to only have one eventlistener 











