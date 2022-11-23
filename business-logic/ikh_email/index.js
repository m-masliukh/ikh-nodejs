import { GmailAPI } from "./email_api.js";
import { MsgDisplayConfig } from "./msgDisplayConfig.js"

var gmailAPIObj = new GmailAPI();
var msgDisplayConfig = new MsgDisplayConfig();
class MsgScanner{
   

  static readInboxContent = async (msgId) => {
    const message = await gmailAPIObj.readGmailContent(msgId);
    MsgScanner.appendMessageRow(message); 
  };

  static readAllMessages = async() =>{
    var config = {
        method: "get",
        url: `https://gmail.googleapis.com/gmail/v1/users/me/messages`,
        headers: {
          Authorization: `Bearer ${await gmailAPIObj.accessToken}`,
          
        },
      };
  
      var data = {};
  
      await axios(config)
        .then(async function (response) {
          
          data = await response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

        data.messages.forEach(element => {
            MsgScanner.readInboxContent(element.id);
        });

  };
  static appendMessageRow(message) {
    $('.table-inbox tbody').append(
        '<tr>\
          <td>'+msgDisplayConfig.getHeader(message.payload.headers, 'From')+'</td>\
          <td>\
            <a href="#message-modal-' + message.id +
              '" data-toggle="modal" id="message-link-' + message.id+'">' +
              msgDisplayConfig.getHeader(message.payload.headers, 'Subject') +
            '</a>\
          </td>\
          <td>'+msgDisplayConfig.getHeader(message.payload.headers, 'Date')+'</td>\
        </tr>'
      );
    $('body').append(
      '<div class="modal" id="message-modal-' + message.id +'" tabindex="-1" role="dialog">\
      <div class="modal-dialog" role="document">\
        <div class="modal-content">\
          <div class="modal-header">\
          <h4 class="modal-title" id="myModalLabel">' +
          msgDisplayConfig.getHeader(message.payload.headers, 'Subject') +
            '</h4>\
          <button type="button"\
          class="close"\
          data-dismiss="modal"\
          aria-label="Close">\
    <span aria-hidden="true">&times;</span></button>\
          \</div>\
          <div class="modal-body">\
          <iframe id="message-iframe-'+message.id+'" srcdoc="<p>Loading...</p>">\
          </iframe>\
          </div>\
          <div class="modal-footer">\
          <button type="button" class="btn btn-default" data-dismiss="modal">Закрити</button>\
          <a href="https://mail.google.com/mail/u/0/?ogbl#inbox/'+message.id+'" target="_blank">Відповісти</a>\
          </div>\
        </div>\
      </div>\
    </div>'
    );
    $('#message-link-'+message.id).on('click', function(){
        var ifrm = $('#message-iframe-'+message.id)[0].contentWindow.document;
        $('body', ifrm).html(msgDisplayConfig.getBody(message.payload));
        
      });
  }

}
    

var searchMsgBtn = document.getElementById('searchMsgBtn');
  searchMsgBtn.onclick = async () => {
  var searchTerm = document.getElementById('searchInput').value;
  if(searchTerm != ''){
  $('.table-inbox tbody').empty();
  var config1 = {
    method: "get",
    url:
      "https://www.googleapis.com/gmail/v1/users/me/messages?q=" + searchTerm,
    headers: {
      Authorization: `Bearer ${await gmailAPIObj.accessToken} `,
    },
  };
  var threadId = '';

  await axios(config1)
    .then(async function (response) {
      threadId = await response.data["messages"][0].id;

      console.log(threadId);
    })
    .catch(function (error) {
      console.log(error);
    });
  
    
      MsgScanner.readInboxContent(threadId);
 

  }
else{
  alert('Поле для пошуку порожнє!')
}
};

var searchInput = document.getElementById('searchInput');
  searchInput.onfocusout = () => {
    if(searchInput.value == ''){
      $('.table-inbox tbody').empty();
      MsgScanner.readAllMessages();
    }
  };

MsgScanner.readAllMessages();