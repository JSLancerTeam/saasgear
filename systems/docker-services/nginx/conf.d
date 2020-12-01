server {
  listen 80;
  listen [::]:80;

  server_name api.saasgear.local;

  charset utf-8;
  sendfile off;
  client_max_body_size 100m;

  location / {
    proxy_pass http://localhost:3005;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  access_log /var/www/app/.docker/logs/nginx/access.log;
  error_log /var/www/app/.docker/logs/nginx/error.log;
}

server {
  listen 80;
  listen [::]:80;

  server_name saasgear.local;

  charset utf-8;
  sendfile off;
  client_max_body_size 100m;

  location / {
    proxy_pass http://127.0.0.1:3002;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  access_log /var/www/app/.docker/logs/nginx/access.log;
  error_log /var/www/app/.docker/logs/nginx/error.log;
}