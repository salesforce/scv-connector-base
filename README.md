# telephony-connector
Salesforce telephony connector.

## Installation

### Environment setup
The developer environment requires [Node](https://nodejs.org/en/download/), [NPM](https://docs.npmjs.com/cli/install) and [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html). 


### Installation
#### Clone the repo

```
$ cd /directory/to/house/the/repo
$ git clone git@git.soma.salesforce.com:hvcc/telephony-connector.git
```

#### Install the dependencies

```
$ npm install
```

### Launch webpack dev server 

```
$ npm start
```

By default the web server will run in SSL on port 8080. 

## Testing
Lint all the source code and run all the unit tests:
```
$ npm test
```
To bundle the source code in the src/ folder into one connector.js file:
```
$ gulp bundle
```
To bundle the source code in the src/ folder into one minified connector_min.js file:
```
$ gulp bundle --mode prod
```

## Integrate with SFDC
 
### Submitting to p4
 
 - The following command generates a default CL in perforce. It generates 3 html files (configs), and the connector (minified and non-minified).
 ```
 gulp p4edit
 ```

## Contributing and Developing Locally
We welcome contributors into our repo. Please read the [contributing guidelines](https://git.soma.salesforce.com/hvcc/telephony-connector/blob/master/CONTRIBUTING.md) for more information.
