$(function(){

  function messageHTML(message){
    var html = `<div class="right-content-message__user-name" data-id="${message.id}">${message.user.name}</div>
                <div class="right-content-message__date">${message.created_at}</div>
                <div class="right-content-message__message-text">${message.content}</div>`
    return html;
  }

  function imageHTML(message){
    var html = `<div class="right-content-message__message-text"><img src="${message.image_url}"></div>`
    return html;
  }

  setInterval(function(){
    var latest_message = $('.right-content-message__user-name:last')
    var message_id = latest_message.length ? latest_message.data("id") : 0

    $.ajax({
      url: location.href,
      type: 'GET',
      data: { id: message_id },
      dataType: 'json'
    })

    .done(function(data){
      if (data.length){
        data.forEach(function(new_message){
          var img = new_message.image_url ? imageHTML(new_message) : '';
          var html = messageHTML(new_message)
          $('.right-content-message').append(html).append(img)
        })
        $('html, body').animate({
            scrollTop: $(document).height()
          },1500);
      }
    })

    .fail(function(){
      alert("自動更新が失敗しました")
    })
  },5000);
});
