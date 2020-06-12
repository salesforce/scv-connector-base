# Contributing Guidelines
Making changes to the Telephony Connector

## Testing Your Changes
* To test locally, run:
```
$ npm start
```
and change your org's call center adapter URL to https://localhost:8080 (accept the certificates if needed)

* To bundle the source code in the src folder into one connector.js file:
```
$ gulp bundle
```
* To bundle the source code in the src folder into one minified connector_min.js file:
```
$ gulp bundle --mode prod
```
* To test the changes in local core app end-to-end, run:
```
$ gulp p4edit
```
* This adds the changes to your local p4 repository in the default changelist. 
* Then, change your local org's call center adapter URL to /hvcc/amz/index_debug.html
 
## Release Versions
For each new Salesforce release a new branch must be created:
 - duplicate master branch code
 - publish to npm (npm publish)  

## Workflow
* Create a feature branch:
```
$ git checkout -b my-feature
```
* Make and commit code changes. Note that there is a pre-commit hook which will commit code changes only if `npm test` passes without any error.
```
$ git status
$ git add -A
$ git diff
$ git commit -m "My feature"
$ git log
```
* Push the feature branch to the repository:
```
$ git push
```
* Create a pull request from the just pushed feature branch.
* Mention at least one team member on the pull request to review the code changes.
* After at least one reviewer signs off on the review, merge the pull request.
* Switch to the master branch:
```
$ git checkout master
```
* Sync with the remote repository:
```
$ git pull
```
* Delete the feature branch:
```
$ git branch -D my-feature
```
* Create a p4 change list to merge the changes into the p4 repository:
```
$ gulp p4edit
```
* Edit the change list using the default text editor. Make sure to specify the following in the change list:
  * A link to an active GUS work record.
  * Reviewer annotation.
* Submit the change list to precheckin.
