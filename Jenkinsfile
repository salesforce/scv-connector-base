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

def envDef = [ compliance: complianceFlags, buildImage: "ops0-artifactrepo1-0-prd.data.sfdc.net/dci/centos-sfci-nodejs:latest"]	

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
}