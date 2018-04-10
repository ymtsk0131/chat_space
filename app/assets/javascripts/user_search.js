$(function(){

var users = $('#chat-group-users')

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  users.append(html)
}

  $(document).on('keyup', '#user-search-field', function(){
    $('#chat-group-users').empty();
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      datatype: 'json',
    })

    .done(function(users) {
      users.forEach(function(user){
        appendUser(user)
      });
    })
  });
});

