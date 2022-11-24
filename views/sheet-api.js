import TermModel from '../models/termsModel.js';
import TermView from './termsView.js';
import TermController from '../controllers/termsController.js';

import UrlModel from '../models/urlsModel.js';
import UrlView from './urlsView.js';
import UrlController from '../controllers/urlsController.js';

import SearchConfiguration from '../business-logic/search_realiz/SearchConfiguration.js';
import SearchRealization from '../business-logic/search_realiz/SearchRealization.js';
import NewsList from '../business-logic/search_realiz/NewsList.js';
 

var termApp = new TermController(new TermModel(), new TermView());
var urlApp = new UrlController(new UrlModel(), new UrlView());


const searchConfigObj = new SearchConfiguration();
 
function whenLoaded() {

    urlApp.model.init().then(() => {
        urlApp.view.displayUrls(urlApp.model.getAll());
        var urlObjs = urlApp.model.getAll();
        urlObjs.forEach(t => {
        searchConfigObj.searchSites = t.urls;
        
    });
    
    });
    
    termApp.model.init().then(() => {
        termApp.view.displayTerms(termApp.model.getAll());
        
    }); 
}
var searchLink = document.getElementById('searchBtn');
var newsListObj = new NewsList();

searchLink.onclick = function(){
    
    termApp.model.init().then(() => {
        
        searchConfigObj.searchTerms = termApp.model.getAll();
        const searchRealizObj = new SearchRealization(searchConfigObj);
        newsListObj.items = searchRealizObj.search();
        console.log(newsListObj.items);
        
    }); 
}

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

var acceptBtn = document.getElementById('acceptBtn');

acceptBtn.onclick = function(){
  var newsCards = document.getElementsByClassName("card-header");
  for (var news of newsCards) {
    if (news.getElementsByTagName("input")[0].checked) {
      const text = news.getElementsByClassName("card-body")[0].textContent;
      const source = news.getElementsByClassName("card-body")[0]
                         .getElementsByClassName("card-source")[0].href;
      acceptNews(text, source);
    }
  }
}

async function acceptNews(text, source) {
  const date = Date.now();
  
  try {
    const res = await instance.post("/news", {
      text: text,
      source: source,
      date: date
    });
  
    const result = {
      status: res.status + "-" + res.statusText,
      headers: res.headers,
      data: res.data,
    };
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', whenLoaded());