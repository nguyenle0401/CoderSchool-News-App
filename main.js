let newsList = []
let page = 1
const apiKey = `fb79e1dd73084533b72be1bc6d99e5c0`
let newChoose = "General"
const callApi = async () => {
    // if( newChoose !== myArrayCategory[index]){
    //     page = 1
    //     newChoose = myArrayCategory[index]
    //     newsList = []
    // }
    let url = `https://newsapi.org/v2/top-headlines?country=us&catelogy=${newChoose}&page=${page}&apiKey=${apiKey}`
    console.log('url:',url)
    let data = await fetch(url)
    let result = await data.json()
    newsList = newsList.concat(result.articles)
    render(newsList)
    console.log(newsList)
}


const render = (list) => {
    //use moment js to show publishedAT data
    let newsHTML = list.map(item => {
        return `<div class="style_news"><div class="card text-justify" style="width: 50rem;">
        <img src="${item.urlToImage}" class="card-img-top"  alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title style_title"><a href = "${item.url}">${item.title}</h5>
          <p class="card-text">${item.content}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">${moment(item.publishedAt).fromNow()}</li>
        <li class="list-group-item">Source: ${item.source.name}</li>
        <li class="list-group-item">Author: ${item.author}</li>
        </ul>
        <div class="card-body">
        <a href="${item.url}" class="card-link btn btn-primary">Read more</a>
        </div>
        </div>
        </div>`
    })
    document.getElementById("newsListArea").innerHTML = newsHTML
}

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
    newChoose = myArrayCategory[index]
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&category=${myArrayCategory[index]}`;
    let data = await fetch(url)
    let result = await data.json()
    newList = result.articles

    render(newList)
    console.log(url)
}

//by keyword
async function searchByKeyWord() {
    let keyWord = document.getElementById("keyWord").value;
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&q=${keyWord}`;
    let data = await fetch(url)
    let result = await data.json()
    newList = result.articles
    render(newList)
    console.log(url)
}


// able to load more articles
const viewMore = () => {
    page++
    callApi()
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




//show all news

callApi();