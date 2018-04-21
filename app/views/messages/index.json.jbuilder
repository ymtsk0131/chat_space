if @new_message.present?
  json.array! @new_message do |message|
    json.id           message.id
    json.content      message.content
    json.image_url    message.image.url
    json.created_at   message.created_at
    json.user_name    message.user.name
  end
end
