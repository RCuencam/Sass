const $actionContainer=document.querySelector(".action_list")
const $terrorContainer=document.querySelector(".terror_list")

async function getData(url)
{
    const response=await fetch(url)
    const data=await response.json()
    return data.data.movies;
}
function addHTML(img,title)
{
    return(
        `<div class="movie_item action_item">
        <img src="${img}" alt="" class="movie_image">
        <h2 class="movie_title">${title}</h2>
    </div>`
    )
}
async function load()
{
    const actionList= await getData("https://yts.mx/api/v2/list_movies.json?genre=action")
    const terrorList=await getData("https://yts.mx/api/v2/list_movies.json?genre=drama")
    terrorList.forEach(data => {
        $terrorContainer.innerHTML+=addHTML(data.large_cover_image,data.title)
    });
    actionList.forEach(data => {
        $actionContainer.innerHTML+=addHTML(data.large_cover_image,data.title)
    });
}
load()
fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${userAccessToken}`     
  }
})
.then(response => {
    console.log(response.json())})