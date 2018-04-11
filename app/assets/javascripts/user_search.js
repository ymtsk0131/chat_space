$(function(){

var users = $('#chat-group-users')
var members = $('#chat-group-members')

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix" id="chat-group-user-${user.id}">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  users.append(html)
}

function addUser() {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
                <p class='chat-group-user__name'>ユーザー名</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  members.append(html)
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

    .fail(function() {
      alert('ユーザーの検索に失敗しました')
    })
  });

  $(document).on('click', '#chat-group-users', function(){
    var user_id = $('.chat-group-user__btn--add').attr('data-user-id')
    console.log(user_id)
    addUser();
    $('#chat-group-user-' + user_id).remove();
    console.log("add");
  })

  $(document).on('click', '#chat-group-user-8 > a', function(){
    $('#chat-group-user-8').remove();
    console.log("remove")
  })
});

