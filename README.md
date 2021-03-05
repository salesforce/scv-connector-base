# scv-connector-base
Service Cloud Voice Connector Foundation.

## Installation

### Environment setup
The developer environment requires [Node](https://nodejs.org/en/download/), [NPM](https://docs.npmjs.com/cli/install) and [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html). 


### Installation
#### Clone the repo

```
$ cd /directory/to/house/the/repo
$ git clone git@github.com:salesforce/scv-connector-base.git
```

#### Install the dependencies

```
$ npm install
$ gulp
```

### Document

Please read the documents in the `/docs/` folder for the details.

### Using it

See https://github.com/salesforce/demo-scv-connector


### Upgrading the Typescript files
Please run the following command to upgrade the typescript files. Delete the constants.ts file as we are not exposing that
```
$ npx typescript src/main/*.js --declaration --allowJs --emitDeclarationOnly --outDir ts-declaration
```


## Contributing and Developing Locally
We welcome contributors into our repo. Please read the [contributing guidelines](https://github.com/salesforce/scv-connector-base/blob/master/CONTRIBUTING.md) for more information.


## Change Log
Removed ConferenceResult