
const username = document.getElementById("username");

const button = document.getElementById("searchBtn");

const results = document.querySelector("div p");

const repos = document.getElementById("Repos");

// EVENT LISTENER
button.addEventListener("click", displayUsername);


// FETCH GITHUB USER API
async function getApi(userInput) {
    const response = await fetch(`https://api.github.com/users/${userInput}`);

    if (!response.ok) {
        const noUserFound = document.createElement("h2");
        noUserFound.textContent = "No User found";
        results.append(noUserFound); 
        return null;
    }

    const parsedResponse = await response.json();
    return parsedResponse;
}


// DISPLAY AVATAR
function getAvatar(parsedResponse) {
    const Avatar_Pic = document.createElement("img");

    Avatar_Pic.src = parsedResponse.avatar_url;
    Avatar_Pic.width = 250;

    results.append(Avatar_Pic);
}


// DISPLAY NAME
function displayName(response) {
    const profileName = document.createElement("h2");

    if (response.name == null) {
        profileName.textContent = "Profile name: Name not provided";
    } else {
        profileName.textContent = `Profile name: ${response.name}`;
    }

    results.append(profileName);
}


// DISPLAY TOTAL REPOSITORIES
function displayRepo(parsedResponse) {
    const totalRepo = document.createElement("h2");

    totalRepo.textContent = `Public Repo: ${parsedResponse.public_repos}`;

    results.append(totalRepo);
}


// DISPLAY BIO
function displaybio(parsedResponse) {
    const bio = document.createElement("h2");

    if (parsedResponse.bio == null) {
        bio.textContent = "No Bio provided";
    } else {
        bio.textContent = `Bio: ${parsedResponse.bio}`;
    }

    results.append(bio);
}


// DISPLAY FOLLOWERS
function displayfollowers(parsedResponse) {
    const followers = document.createElement("h2");

    followers.textContent = `Followers: ${parsedResponse.followers}`;

    results.append(followers);
}


// DISPLAY FOLLOWING
function displayfollowing(parsedResponse) {
    const following = document.createElement("h2");

    following.textContent = `Following: ${parsedResponse.following}`;

    results.append(following);
}


// FETCH AND DISPLAY REPOSITORIES
async function displayReposList(parsedResponse) {

    const response = await fetch(parsedResponse.repos_url);

    if (!response.ok) {
        console.log("Could not fetch repositories");
        return;
    }

    const repo_data = await response.json();

    const repo_list = document.createElement("ol");

    if (repo_data.length === 0) {
        repos.textContent = "This user has no public repositories.";
        return;
    }

    for (const eachDict of repo_data) {

        const repoName = document.createElement("li");

        const repoLink = document.createElement("a");

        repoLink.textContent = eachDict.name;

        repoLink.href = eachDict.html_url;

        repoLink.target = "_blank";
        repoLink.rel = "noopener noreferrer";

        repoName.append(repoLink);

        repo_list.append(repoName);
    }

    repos.append(repo_list);
}


// MAIN FUNCTION
async function displayUsername() {

    const userInput = username.value.trim();

    results.textContent = "";
    repos.textContent = "";

    if (userInput === "") {
        results.textContent = "Please enter a valid username";
        return;
    }
    results.textContent = "Profile is loading";
    button.disabled = true;

    let parsedResponse;


    try{
    parsedResponse = await getApi(userInput);
    results.textContent = "";
    button.disabled = false;
    displayName(parsedResponse);
    displaybio(parsedResponse);
    displayfollowers(parsedResponse);
    displayfollowing(parsedResponse);
    displayRepo(parsedResponse);
    getAvatar(parsedResponse);
    await displayReposList(parsedResponse);
    }
    catch(error){
        results.textContent = "There is an erro, not able to fetch the API response"
    }
    // when we finally even though there is a return right the code in finally will still run 

    finally{
        button.disabled = false;
    }

}
