const SearchRealization = require("../business-logic/search_realiz/SearchRealization");
const fs = require('fs');
const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });


export default class acceptedNewsList{
    constructor(){
        this.acceptedNews = new Array();
    }

    getAllAcceptedNews(){
        if(this.acceptedNews === ""){
            throw new Error('Жодного допису не створено');
        }
        return this.acceptedNews;
    }

    getAcceptedNews(i){
        if(this.acceptedNews === ""){
            throw new Error('Жодного допису не створено');
        }
        return this.acceptedNews[i];
    }

    setAllAcceptedNews(newsList){
        this.acceptedNews=newsList;
    }

    setAcceptedNews(news){
        this.acceptedNews.push(news);
    }

    makeHtmlList(parentId){
        parentBlock=document.getElementById(blockid);
        newlist=`<ul class="monitor_news">`;
        index=0;
        this.posts.forEach(post=>{
            newlist += `<li> 
                <h3>${post["text"]}</h3>
                <a href="${post['source']}" target="_blank" >Читати далі</a>
                <input type="button" class="news_accept" value="На головну сторінку" id="sendToMain${index}" onclick="showNewsForEveryone(this.id)"/>
                <input type="button" class="news_accept" value="В кабінет користувача" id="sendToCabinet${index}" onclick="showNewsForRegistered(this.id)"/>
            </li>`;
            index++;
        })
        newlist += `</ul>`;
        parentBlock.innerHTML += newlist;
    }

    async showNewsForEveryone(id){
        i=id.replace('sendToMain','');
  
        try {
        const res = await instance.post("/news", {
            text: this.acceptedNews[i].text,
            source: this.acceptedNews[i].source,
            date: this.acceptedNews[i].date
        });
    
        const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
        };
    
        console.log(result);
        this.acceptedNews.splice(i, 1);
        } catch (err) {
            console.log(err);
        }
    }

    showNewsForRegistered(id){
        i=id.replace('sendToCabinet','');
        fs.appendFile('log.txt', this.acceptedNews[i], 'utf-8', err => {
            if (err) {
              throw err;
            }
            console.log('News added to log file');
          });
        this.acceptedNews.splice(i, 1);
    }

    
}