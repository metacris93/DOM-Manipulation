const baseUrl = "https://picsum.photos";
const app = document.querySelector("#app")
const btnAdd = document.querySelector("#add-img")
const clearImages = document.querySelector("#clear-img")
let imgCounter = 0
let imgRendered = 0 

const isIntersecting = (entry) => entry.isIntersecting

const Log = () => {
    console.log(`Total Imágenes: ${imgCounter}`);
    console.log(`Imágenes renderizadas: ${imgRendered}`);
    console.log("------------------------------");
}
const observer = new IntersectionObserver((entries) => {
    entries
        .filter(isIntersecting)
        .forEach(loadImage)
})

const loadImage = (entry) => {
    const container = entry.target
    const img = container.firstChild
    const url = img.dataset.src
    img.src = url
    img.onload = () => { 
        imgRendered += 1
        Log()
    };
    //desregistra la imagen (unlisten)
    observer.unobserve(container)
}

const registerImage = (image) => {
    //IntersectionObserver -> observar -> image
    imgCounter += 1
    Log()
    observer.observe(image)
}

async function createImageNode()
{
    const rnd = Math.floor(Math.random() * 100)
    const response = await fetch(`${baseUrl}/300/300?random=${rnd}`)
    
    const container = document.createElement("div")
    container.className = "m-4"

    const img = document.createElement("img")
    img.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
    img.className = "mx-auto rounded-md bg-gray-300";
    img.dataset.src = response.url

    container.appendChild(img)
    app.appendChild(container)
    registerImage(container)
}
const removeImages = () => {
    const container = document.querySelector("#app")
    let first = container.firstElementChild
    while(first)
    {
        first.remove()
        first = container.firstElementChild
    }
}

btnAdd.addEventListener("click", createImageNode)
clearImages.addEventListener("click", removeImages)