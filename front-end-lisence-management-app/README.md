# [Vue Paper Dashboard](https://cristijora.github.io/vue-paper-dashboard/)

> Admin dashboard based on paper dashboard UI template + vue-router

This project is a vue version of [Paper-dashboard](https://www.creative-tim.com/product/paper-dashboard)
designed for vue js.The dashboard includes vue-router

Check the [Live Demo here](https://cristijora.github.io/vue-paper-dashboard).

[Nuxt Version (outdated Bootstrap 3)](https://github.com/cristijora/vue-paper-dashboard-nuxt)
![](http://i.imgur.com/3iC1hOs.gif)

## Documentation
Link to [Documentation](http://vuejs.creative-tim.com/vue-paper-dashboard/documentation/)

## Build Setup

### install dependencies
```
npm install
```
### serve with hot reload at localhost:8080
```
npm run dev
```
### build for production with minification
```
npm run build
```
### lint
```
npm run lint
```
## Contribution guide
* Fork the repository
* `npm install` or `yarn install`
* Make changes
* Open Pull Request

For detailed explanation on how things work, checkout the [guide](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md)
- [CHANGELOG](./CHANGELOG.md)
- [version-badge](https://img.shields.io/badge/version-2.0.0-blue.svg)
- [license-badge](https://img.shields.io/badge/license-MIT-blue.svg)

## License

[MIT](https://github.com/cristijora/vue-paper-dashboard/blob/master/LICENSE.md)


## Dockerize VueJS tutorial

1. Create a dockerfile with all environments for project
2. run script - "docker build -t username/projectname ."  for setup all environments
3. after build run script "docker run -p 3000:80 name/idcontainer"
4. test container run, if docker run - application ready to deploy 


## Deploy to Heroku
1. heroku login
2. heroku container:login
3. git clone 
4. cd to folder contains package.json
5. heroku create -a name-app
6. heroku container:push web -a name-app
7. heroku container:release web -a name-app
8. heroku open --app name-app

## Redeploy to Heroku after change code
