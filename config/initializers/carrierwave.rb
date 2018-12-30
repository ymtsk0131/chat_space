require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'

CarrierWave.configure do |config|
  config.storage = :file
  # config.fog_credentials = {
  #   provider: 'AWS',
  #   aws_access_key_id: Rails.application.secrets.aws_access_key_id,
  #   aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
  #   region: 'ap-northeast-1'
  # }

  # config.fog_directory  = 'chatspace-ymtsk0131'
  # config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/chatspace-ymtsk0131'
end
