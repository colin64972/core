#!/bin/bash

. ~/.bash_functions --source-only

printYellow Cleaning...

deleteFolders node_modules dist distPreRenders .serverless

deleteFiles *.lock *.log *.error

printGreen PASS