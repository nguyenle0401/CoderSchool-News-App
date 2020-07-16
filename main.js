let newsList = []
let page = 1
const apiKey = `fb79e1dd73084533b72be1bc6d99e5c0`
let currentCategory = "General";
let keyWord = "";

const callApi = async () => {
    console.log(currentCategory)
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${currentCategory}&page=${page}&apiKey=${apiKey}`
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
          <h5 class="card-title style_title"><a href = "${item.url}">${item.title}</a></h5>
          <p class="card-text">${item.content}</p>
        </div>
        <div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">${moment(item.publishedAt).fromNow()}</li>
        <li class="list-group-item "><strong>Source</strong>: ${item.source.name}</li>
        <li class="list-group-item "><strong>Author</strong>: ${item.author}</li>
        </ul>
        </div>
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
    currentCategory = myArrayCategory[index];
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&category=${currentCategory}`;
    let data = await fetch(url)
    let result = await data.json()
    newList = result.articles
    render(newList)
    console.log(url)
}

//by keyword

async function searchByKeyWord() {
    keyWord = document.getElementById("keyWord").value;
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&q=${keyWord}&category=${currentCategory}`;
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
// async function searchBySource() {
//     let source = document.getElementById("searchBySource").value;
//     url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&sources=${source}`;
//     console.log(source)
//     let data = await fetch(url)
//     let result = await data.json()
//     newList = result.articles
//     render(newList)
//     console.log(url)
// }
const renderSource = () => {
    let sources = newsList.map((item) => item.source.name);
    let result = {};
    for (let i = 0; i < sources.length; i++) {
      if (sources[i] in result) {
        result[sources[i]]++;
      } else {
        result[sources[i]] = 1;
      }
    }
    console.log("result is",result)
    
    let keys = Object.keys(result);
    let sourceHTML = keys.map((key) =>
          `<input type="checkbox" onchange="searchBySource('${key}')">${key}:${result[key]}`
      )
      .join("");
  
    document.getElementById("sourceArea").innerHTML = sourceHTML;
  };

const searchBySource = (source) => {
    console.log("source?:", source);
    let filteredList = newsList.filter((item) => item.source.name === source);
    render(filteredList);
  };
  


callApi();