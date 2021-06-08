/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

@Library('sfci-pipeline-sharedlib@master')

import net.sfdc.dci.BuildUtils
import net.sfdc.dci.CodeCoverageUtils

env.RELEASE_BRANCHES = ['master']

def complianceFlags = [
                        enable: true,//For ensuring PR has WI mentiooned
                        validateCommitsInPR: true // For ensuring all commits have WI mentioned     
                      ]

def envDef = [ compliance: complianceFlags, buildImage: "ops0-artifactrepo1-0-prd.data.sfdc.net/dci/centos-sfci-nodejs:latest", maxDaysToKeepBuild: 10 , maxNumToKeepBuild: 100]	

def coverage_config = [
    tool_name              : 'clover',
    gus_team_name          : 'Voice Ecosystem',
    test_suite             : 'aggregate',
    language_type          : 'javascript',
    aggregate_team_coverage: true,
    dev_gus_upload         : false,
    gus_record_active      : true,
    report_location        : 'coverage/clover.xml'
]

executePipeline(envDef) { 	
    stage('Init') {
            checkout scm
            npmInit()
            sh 'npm install'
    }	
    stage('NPM Test and Build'){
      sh 'npm run test'	
    } 
   
    stage('Coverage Report') {
          publishHTML([
              allowMissing: false,
              alwaysLinkToLastBuild: false,
              keepAll: false,
              reportDir: 'jest-report',
              reportFiles: 'index.html',
              reportName: 'JEST Results',
              reportTitles: ''
          ])
          publishHTML([
              allowMissing: false,
              alwaysLinkToLastBuild: false,
              keepAll: false,
              reportDir: 'coverage/lcov-report',
              reportFiles: 'index.html',
              reportName: 'JEST Coverage',
              reportTitles: ''
          ]) 
          CodeCoverageUtils.uploadReportForGusDashboard(this, coverage_config)
      }
    
    // More information: https://salesforce.quip.com/A7RBA2kk3b74
    stage('GUS Compliance'){
        git2gus()
    }
    markBuildComplete()
}

def markBuildComplete() {
    currentBuild.result = SUCCESS
    stage('Complete'){
        changeStatus("Build and Release Complete", 'COMPLETE', SUCCESS, this)
    }
}

def changeStatus(context, description, state, dsl) {
    def jenkinsJob = JenkinsUtils.getJob(dsl).toString().split('/').last().replace("]", "")
    def jenkinsBuild = JenkinsUtils.getBuild(dsl).toString().split('#').last()
    def githubSha = BuildUtils.getLatestCommitSha(dsl)
    def githubInfo = GitHubUtils.getDefaultGithubParams(dsl)

    def target_url = "https://servicecloudvoiceci.dop.sfdc.net/job/hvcc/job/${githubInfo.repo}/job/${jenkinsJob}/${jenkinsBuild}"
    def sha_url = "https://git.soma.salesforce.com/api/v3/repos/${githubInfo.org}/${githubInfo.repo}/statuses/${githubSha}"

    def postBody = [
            context: context,
            description: description,
            state: state,
            target_url: target_url
    ]

    def authParam = ''
    withCredentials([usernamePassword(
            credentialsId: 'sfci-git',
            usernameVariable: 'USERNAME',
            passwordVariable: 'GITTOKEN'
    )]) {
        authParam = [[name: 'Authorization', value: "token ${GITTOKEN}"]]
        def response = BuildUtils.doPost(dsl, sha_url, postBody, authParam, null, null, true)
        def responseContent = readJSON text: response.get('content')
        if (!response.get('status') == 201 ) {
            echo "[Error] Failed to post status to git commit. \n ${responseContent.errors}"
        }

        echo "Github response content"
        echo response.get('content')

        responseContent = null // https://stackoverflow.com/a/37897833
    }
}