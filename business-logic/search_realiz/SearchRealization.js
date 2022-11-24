const acceptedNewsList = require("../../posts_realiz/acceptedNewsList");

export default class SearchRealization {

    constructor(configObj_) {
        this.configObj = configObj_;
        this.termsCount = this.configObj.termsStr.length;
        console.log(this.termsCount);
    }

    search() {
        var newsArrObj = [];
        newsAccordion = document.getElementById("newsAccordion");
        newsAccordion.innerHTML += `
                                    <div>
                                    <button id="rejectBtn" class="reject">
                                    <i class="material-icons" style="font-size:27px; vertical-align: middle;">close</i>
                                        <span>Відхилити</span>
                                    </button>
                                    <button id="acceptBtn" class="accept" style="float:center">
                                    <i class="material-icons" style="font-size:27px; vertical-align: middle;">&#xE147;</i>
                                        <span>Прийняти</span>
                                    </button>
                                    </div>`;
                                    
        for (var k = 0; k < this.termsCount; ++k) {
            var oReq = new XMLHttpRequest();
            var searchUrl = 'https://www.googleapis.com/customsearch/v1?' +
                'key=' + 'AIzaSyD_c8jR9WGWe8kxuAfZ-YDSl4mtOlpYn_M' +
                '&cx=' + '624ff4fbe1c2241d0' +
                '&q=' + encodeURIComponent(this.configObj.termsStr[k]) +
                '&siteSearch=' + this.configObj.getSearchSite();

            oReq.open("GET", searchUrl);
            oReq.send();
            oReq.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(oReq.response);
                    console.log(response);
                    let newsHtml = "";
                    let currDate = new Date();
                    response.items.forEach(function (element, index) {
                        newsArrObj.push({ text: element['snippet'], source: element['link'], date: currDate.toLocaleDateString(), isAccepted: false });
                        console.log(newsArrObj);

                        let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                            <input type="checkbox" name="newsCheckbox" value="${element['link']}" />
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                   <b>Пропозиція:</b> ${element["title"]}
                                </button>
                                
                                <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body"> ${element["snippet"]}. <a href="${element['link']}" target="_blank" >Read more here</a>  </div>
                                </div>
                                <br>
                            </div>

                            
                        </div>`;
                        newsHtml += news;
                    });
                    console.log('After all');
                    console.log(newsArrObj);
                    newsAccordion.innerHTML += newsHtml;

                }
            }
        }
        return newsArrObj;
    }
}

