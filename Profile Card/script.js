async function fetchGithubProfile() {
    const username = document.querySelector('#username').value
    const profile_card = document.querySelector('.card')

    profile_card.innerHTML = ``

    if(!username){
        profile_card.innerHTML = `<h4 style="color: red; padding: 10px 0px;">Please give a github username</h4>`
        return
    }

    try{
        const response = await fetch(`https://api.github.com/users/${username}`)
        if(!response.ok){
            throw new Error(`User not found`)
        }
        const data = await response.json()

        console.log(data)

        profile_card.innerHTML = `
            <div class="profile-img">
                <img src="${data.avatar_url}" alt="avatar">
            </div>
            <div class="content">
                <h3 class="name">${data.name || 'No Name Available'}</h3>
                <p class="username">${data.login}</p>
                <p class="bio">${data.bio || 'No Bio Available'}</p>
            </div>
            <a href="${data.html_url}" id="profile-btn" target="_blank">Github Profile</a>
            <div class="members">
                <span>Following: ${data.following}</span>
                <span class="line">|</span>
                <span>Followers: ${data.followers}</span>
            </div>
        `
    }catch(error){
        profile_card.innerHTML = `<h4 style="color: red;padding: 10px 0px;">${error}</h4>`
    }
}

document.querySelector('#get-btn').onclick = fetchGithubProfile;








