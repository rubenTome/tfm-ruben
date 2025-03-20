FROM node:22.14.0

WORKDIR /tfm-frontend
COPY / .
RUN npm install -g @angular/cli@19.1.3 @ng-bootstrap/ng-bootstrap@18.0.0 firebase@11.4.0 @angular/localize @rollup/rollup-linux-x64-gnu
RUN npm install --legacy-peer-deps
RUN ng add @angular/localize --skip-confirmation
COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]