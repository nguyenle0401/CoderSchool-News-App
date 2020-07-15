let newsList = []
let pageNumber = 1;

// let moment = require('moment-timezone/builds/moment-timezone-with-data-2012-2022');
// moment().format('MMMM Do YYYY, h:mm:ss a');


// const apikey= process.env.APIKEY 
// ${apikey}

let apiKey = "0c6481951a6044e2b43b3dfccf075af5"
const callApi = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0c6481951a6044e2b43b3dfccf075af5`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    render(newsList)
    console.log(newsList)
}


const render = (list) => {
    // let publishedAt = moment(item['publishedAt']).fromNow()
    let newsHTML = list.map(item => {
        return `<div class="style_news"><div class="card text-justify" style="width: 40rem;">
        <img src="${item.urlToImage}" class="card-img-top"  alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title style_title"><a href = "${item.url}">${item.title}</h5>
          <p class="card-text">${item.content}</p>
        </div>
        <ul class="list-group list-group-flush">
      
        <li class="list-group-item">Source: ${item.source.name}</li>
        <li class="list-group-item">Author: ${item.author}</li>
        </ul>
        <div class="card-body">
        <a href="#" class="card-link">Read more</a>
        <a href="#" class="card-link">Another link</a>
        </div>
        </div>
        </div>`
    })
    document.getElementById("newsListArea").innerHTML = newsHTML
}

//use moment js to show publishedAT data



//able to search by catagory

let myArrayCategory = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology']

function newButton() {
    let newButton = myArrayCategory.map((item, index) => {
        return `<Button class="mt-2 mb-2 ml-1 mr-1 btn btn-primary" onclick="searchByCategory(${index})" id="${item}">${item}</Button>`
    }).join("")
    document.getElementById('categoryButton').innerHTML += newButton
}
newButton()

async function searchByCategory(index) {
    console.log(myArrayCategory[index])
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&category=${myArrayCategory[index]}`;
    let data = await fetch(url)
    let result = await data.json()
    newList = result.articles

    render(newList)
    console.log(url)
}


async function searchByKeyWord() {
    let keyWord = document.getElementById("keyWord").value;
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&q=${keyWord}`;
    let data = await fetch(url)
    let result = await data.json()
    newList = result.articles
    render(newList)
    console.log(url)
}



{/* <li class="list-group-item">Published at: ${publishedAt}</li> */ }

//able to load more articles
async function loadMore() {
    pageNumber++
    let data = await fetch(`${url}&page=${pageNumber}`)
    let result = await data.json()
    newList = newList.concat(result.articles)
    render(newList)
}


//able to search by source
async function searchBySource() {
    let source = document.getElementById("searchBySource").value;
    url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&sources=${source}`;
    console.log(source)
    let data = await fetch(url)
    let result = await data.json()
    newList = result.articles
    render(newList)
    console.log(url)
}


callApi();