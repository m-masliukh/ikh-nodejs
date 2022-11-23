import { GmailAPI } from "./email_api.js";

var gmailAPIObj = new GmailAPI();

function getHeader(headers, index) {
    var header = '';
    $.each(headers, function(){
      if(this.name.toLowerCase() === index.toLowerCase()){
        header = this.value;
      }
    });
    return header;
  }
 
  function getHTMLPart(arr) {
        for(var x = 0; x <= arr.length; x++)
        {
          if(typeof arr[x].parts === 'undefined')
          {
            if(arr[x].mimeType === 'text/html')
            {
              return arr[x].body.data;
            }
          }
          else
          {
            return getHTMLPart(arr[x].parts);
          }
        }
        return '';
      }
      
function getBody(message) {
        var encodedBody = '';
        if(typeof message.parts === 'undefined')
        {
          encodedBody = message.body.data;
        }
        else
        {
          encodedBody = getHTMLPart(message.parts);
          console.log(encodedBody)
        }
        encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
        var decoded = decodeURIComponent(encodeURIComponent(window.atob(encodedBody)));
        console.log(decoded)
        return decoded;
      }
      
function appendMessageRow(message) {
    $('.table-inbox tbody').append(
        '<tr>\
          <td>'+getHeader(message.payload.headers, 'From')+'</td>\
          <td>\
            <a href="#message-modal-' + message.id +
              '" data-toggle="modal" id="message-link-' + message.id+'">' +
              getHeader(message.payload.headers, 'Subject') +
            '</a>\
          </td>\
          <td>'+getHeader(message.payload.headers, 'Date')+'</td>\
        </tr>'
      );
    $('body').append(
      '<div class="modal" id="message-modal-' + message.id +'" tabindex="-1" role="dialog">\
      <div class="modal-dialog" role="document">\
        <div class="modal-content">\
          <div class="modal-header">\
          <h4 class="modal-title" id="myModalLabel">' +
    getHeader(message.payload.headers, 'Subject') +
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
        $('body', ifrm).html(getBody(message.payload));
        
      });
  }
  
var readInboxContent = async (msgId) => {
    const message = await gmailAPIObj.readGmailContent(msgId);
    appendMessageRow(message); 
  };

var readAllMessages = async() =>{
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
            readInboxContent(element.id);
        });

  };

readAllMessages();