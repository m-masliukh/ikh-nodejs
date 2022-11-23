
export class MsgDisplayConfig{
    
    getHeader(headers, index) {
        var header = '';
        $.each(headers, function(){
          if(this.name.toLowerCase() === index.toLowerCase()){
            header = this.value;
          }
        });
        return header;
      }
     
      getHTMLPart(arr) {
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
          
    getBody(message) {
            var encodedBody = '';
            if(typeof message.parts === 'undefined')
            {
              encodedBody = message.body.data;
            }
            else
            {
              encodedBody = this.getHTMLPart(message.parts);
              console.log(encodedBody)
            }
            encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
            var decoded = decodeURIComponent(encodeURIComponent(window.atob(encodedBody)));
            console.log(decoded)
            return decoded;
          }


}