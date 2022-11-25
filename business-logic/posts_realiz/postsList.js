const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

export default class postsList{
    constructor(){
        this.posts = this.getAllPosts();
    }

    async getAllPosts(){
        
        let resultElement = document.getElementById("getResult");
        resultElement.innerHTML = "";
    
        try {
        const res = await instance.get("/news");
    
        const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
        };
    
        console.log(result);
        return res;
        } catch (err) {
            console.log(err);
        }
    }

    getPosts(){
        if(this.posts === ""){
            throw new Error('Жодного допису не створено');
        }
        return this.posts;
    }

    getPost(i){
        if(this.posts === ""){
            throw new Error('Жодного допису не створено');
        }
        return this.posts[i];
    }

    setPosts(postsList){
        this.posts=postsList;
    }

    setPost(post){
        this.posts.push(post);
    }

    makeHtmlList(parentid){
        parentBlock=document.getElementById(blockid);
        newlist=`<ul class="main_news">`;
        this.posts.forEach(post=>{
            newlist += `<li> 
                <h3>${post["text"]}</h3>
                <a href="${post['source']}" target="_blank" >Читати далі</a>
            </li>`;
        })
        newlist += `</ul>`;
        parentBlock.innerHTML += newlist;
    }
}