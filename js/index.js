document.addEventListener('DOMContentLoaded', () =>{
    const gitForm = document.querySelector("#github-form");
    gitForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let search = e.target.search.value
        //console.log(search)
        handleSearch(search)

function handleSearch() {

    fetch('https://api.github.com/search/users?q=' + search, {
        method: 'GET',
        header:{
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
        },
        body: JSON.stringify()
    })
    .then(response => response.json())
    .then(data => {console.log(data)
        document.querySelector('#user-list').innerHTML = ''
        document.querySelector('#repos-list').innerHTML =''

        data.items.forEach(user => {
            console.log(user)
            let gitUserCard = document.createElement('li')
            gitUserCard.className = 'all-users'
            gitUserCard.innerHTML = `
                <div class='content'>
                    <h3> User: ${user.login}</h3>
                    <p> URL: ${user.html_url}</p>
                    <div class ='repos'>
                    <button class='repo-button' 
                    style='margin-bottom: 30px'>
                    Repositories
                    </button>
                    </div>
                    <img src=${user.avatar_url} />
                </div>`

           document.querySelector('#user-list').appendChild(gitUserCard)   

           const reposButton = document.querySelector('.repos-button')
           console.log(reposButton)
           reposButton.addEventListener('click', () => {
               fetch(user.repos_url, {
               method: 'GET',
               header:{
                   'Content-Type': 'application/json',
                   Accept: 'application/vnd.github.v3+json'
               },
               body: JSON.stringify()
            })
               .then(response => response.json())
               .then(data => {

               data.forEach(repo => {

                    let reposCard = document.createElement('li')
                    reposCard.innerHTML = `
                    <h4> ${repo.name} </h4>
                    <p> ${repo.html_url}</p>
                    `
                    document.querySelector('#repos-list').appendChild(reposCard)

               })
            })

           })


    })

})
}
})
}) 