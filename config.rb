set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

set :protocol, 'http://'
set :host, '0.0.0.0'
set :port, 4567

activate :gzip
activate :dotenv
activate :s3_sync do |s3|
  s3.prefer_gzip           = true
  s3.bucket                = ENV['AWS_BUCKET']
  s3.region                = ENV['AWS_REGION']
  s3.aws_access_key_id     = ENV['AWS_ACCESS_KEY_ID']
  s3.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY_ID']
end

# Build-specific configuration
configure :build do
  ignore 'svg/*'
  activate :minify_css
  activate :minify_javascript
  activate :minify_html
  activate :asset_hash
  activate :relative_assets
  set :protocol, 'http://'
  set :host, 'www.taskgestion.com/'
  set :port, 80
end