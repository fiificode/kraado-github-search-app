const input = document.querySelector('input');
const btn = document.querySelector('button');
const card = document.querySelector('.profile-container');

const repos_container = document.querySelector('.repos-container')


async function user(username) {
  const response = await fetch(`https://api.github.com/users/${username}`)
  const respData = await response.json();

  return respData;
}
async function repos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const respData = await response.json();

  return respData;
}
async function add_repo() {
  const reposData = await repos(input.value);
  console.log(reposData); 
  repos_container.innerHTML = reposData.map(repo => {
    return `
    <ul>
      <a href="#"><li>${repo.name}</li></a>
    </ul>

    `
  }).join('');
}


btn.addEventListener('click',async() => {
  const input_val = input.value;
  const search_result = await user(input_val);

  add_repo();

  if (!search_result.login){
    alert('No user found');
  } else {
    card.innerHTML = `
    
      <div class="profile-container">
        <div class="profile-row">
          <div class="profile-image">
            <img src="${search_result.avatar_url}" alt="">
          </div>
          <div class="about">
            <div class="details">
                <h1 class="name">${search_result.name}</h1>
                <h3 class="username">
                  @ ${search_result.login}
                </h3>
                <p class="country">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                  ${search_result.location}
                </p>
                <p class="twitter">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                  ${search_result.twitter_username}
                </p>
                <p class="date-created">
                  <i class="fa fa-calendar-o" aria-hidden="true"></i>
                  ${search_result.created_at}
                </p>
            </div>
            <div class="profile-btn">
              <a href="${search_result.html_url}" target="_blank">Visit Profile</a>
            </div>
          </div>
        </div>
        <div class="bio">
          <h3>About</h3>
          <p>L${search_result.bio}</p>
        </div>
        <div class="follows-row">
          <div class="follows-col">
            <h3 class="heading">Followers</h3>
            <p>${search_result.followers}</p>
          </div>
          <div class="follows-col">
            <h3 class="heading">Following</h3>
            <p>${search_result.following}</p>
          </div>
          <div class="follows-col">
            <h3 class="heading">Repos</h3>
            <p>${search_result.public_repos}</p>
          </div>
        </div>
      </div>
      </div>
    `
  }
})


// const API_LINK = 'https://api.github.com/users/';

// let search_btn = document.querySelector('button');
// const input = document.querySelector('input');
// const card = document.querySelector('.card');
// let repoUl = document.getElementById('repo');

// var repo = new Array(0);

// search_btn.addEventListener('click',(e)=>{
//   e.preventDefault();
//   if(input.value){
//     getUserDetails(`${API_LINK}${input.value}`)
//     getRepoDetails(`${API_LINK}${input.value}/repos`)
//   }else{
//     alert('Please enter any github username')
//     input.focus();
//   }
// })


// function showUserDetails(data){
//   let card = document.querySelector('.card-body');

//   var j =``;

//   repo.forEach((r)=>{
//     r.forEach((res)=>{
//       j+= `<a href="${res.html_url}"><li>${res.name}</li></a>`;
//     })
//   })

//   card.innerHTML = (`
//       <div class="profile-container">
//       <div class="profile-row">
//         <div class="profile-image">
//           <img src="${data.avatar_url}" alt="">
//         </div>
//         <div class="about">
//           <div class="details">
//               <h1 class="name">${data.name}</h1>
//               <h3 class="username">
//                 @ ${data.login}
//               </h3>
//               <p class="country">
//                 <i class="fa fa-map-marker" aria-hidden="true"></i>
//                 ${data.location}
//               </p>
//               <p class="twitter">
//                 <i class="fa fa-twitter" aria-hidden="true"></i>
//                 ${data.twitter_username}
//               </p>
//               <p class="date-created">
//                 <i class="fa fa-calendar-o" aria-hidden="true"></i>
//                 ${data.created_at}
//               </p>
//           </div>
//           <div class="profile-btn">
//             <a href="${data.html_url}" target="_blank">Visit Profile</a>
//           </div>
//         </div>
//       </div>
//       <div class="bio">
//         <h3>About</h3>
//         <p>${data.bio}</p>
//       </div>
//       <div class="follows-row">
//         <div class="follows-col">
//           <h3 class="heading">Followers</h3>
//           <p>${data.followers}</p>
//         </div>
//         <div class="follows-col">
//           <h3 class="heading">Following</h3>
//           <p>${data.following}</p>
//         </div>
//         <div class="follows-col">
//           <h3 class="heading">Repos</h3>
//           <p>${data.public_repos}</p>
//         </div>
//       </div>
//       <h3 class="repos-heading">
//         Repositories
//       </h3>
//       <div class="repos-container">
//         <ul id="repo">
//           ${j}
//         </ul>
//       </div>
//     </div> 
//   `);
// }



// async function getUserDetails(api){
//   let query = await fetch(api)
//   .then(async (query)=> {
//     return await query.json();
//   })
//   .then((result)=>{
//     if(!result.name){
//       alert("User not found");
//       location.reload();
//     }else{
//       console.log(result);
//       showUserDetails(result);
//     }
//   }).catch((error)=>{
//     console.log(error)
//   })
// }

// async function getRepoDetails(repo_api){
//   let repo_query = await fetch(repo_api)
//   .then(async (repo_query) => {
//       return await repo_query.json();
//   })
//   .then((repo_result)=>{
//     repo.push(repo_result); 
//   }).catch((error)=>{
//       console.log(error);
//   })
// }