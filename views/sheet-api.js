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

async function acceptNews(index) {
  let resultElement = document.getElementById(`acceptBtn${index}`);
  
  const text = document.getElementById(`title${index}`).value;
  const source = document.getElementById(`source${index}`).value;
  const date = Date.now(); //document.getElementById("post-phone").value;
  
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
  
    //resultElement.innerHTML = htmlizeResponse(result);
  } catch (err) {
    //resultElement.innerHTML = htmlizeResponse(err);
  }
}

window.addEventListener('DOMContentLoaded', whenLoaded());