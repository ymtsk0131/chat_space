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

  function addUser(user_name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-member-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-member-id="${user_id}" data-member-name="${user_name}">削除</a>
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
    var add_btn = $('.chat-group-user__btn--add')
    var user_id = add_btn.attr('data-user-id')
    var user_name = add_btn.attr('data-user-name')
    addUser(user_name, user_id);
    $('#chat-group-user-' + user_id).remove();
    console.log("add");
  })

  $(document).on('click', '#chat-group-members', function(){
    var remove_btn = $('.chat-group-user__btn--remove')
    var user_id = remove_btn.attr('data-member-id')
    $('#chat-group-member-' + user_id).remove();
    console.log("remove")
  })
});

