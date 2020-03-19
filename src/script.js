const $actionContainer=document.querySelector(".action_list")
const $terrorContainer=document.querySelector(".terror_list")
const $animationContainer=document.querySelector(".animation_list")
const $modal=document.querySelector(".modal")
async function getData(url)
{
    const response=await fetch(url)
    const data=await response.json()
    return data.data.movies;
}
function addHTMLModal(img,title,synopsis)
{
    return(
        `<h1 class="modal-title">${title}</h1>
        <img src="${img}" alt="" width="150" height="200 class="modal-img">
        <p class="modal-info">${synopsis}</p>
        <button class="modal-button">CLOSE</button>
        `
    )
}
function addHTML(img,title,id)
{
    return(
        `<div class="movie_item action_item" data-id=${id}>
        <img src="${img}" alt="" class="movie_image">
        <h2 class="movie_title">${title}</h2>
    </div>`
    )
}
function eventButton($modalButton)
{
    $modalButton.addEventListener("click",()=>
    {
        $modal.style.animation="modalOut 1s forwards"
    })
}
function addEventClick($element,list)
{
    $element.addEventListener("click",()=>{
        if(parseInt($element.dataset.id)===list.id)
        {
            $modal.style.animation="modalIn 1s forwards"
            $modal.innerHTML=addHTMLModal(list.large_cover_image,list.title,list.synopsis)
            const $modalButton=document.querySelector(".modal-button")
            eventButton($modalButton)
        }
    })
}
function renderMovies(list,$container)
{

    list.forEach((data,index) => {
        $container.innerHTML+=addHTML(data.large_cover_image,data.title,data.id)
        for(let i=0;i<=index;i++)
        {
            addEventClick($container.children[i],list[i])
        }
    });
}
async function load()
{
    const actionList= await getData("https://yts.mx/api/v2/list_movies.json?genre=action")
    const terrorList=await getData("https://yts.mx/api/v2/list_movies.json?genre=drama")
    const animationList=await getData("https://yts.mx/api/v2/list_movies.json?genre=animation")
    renderMovies(terrorList,$terrorContainer)
    renderMovies(actionList,$actionContainer)
    renderMovies(animationList,$animationContainer)
}
load()
