#!/bin/bash

. ~/.bash_functions --source-only

function printGreen {
  echo -e "\033[32m $1 \033[0m"
}

function printYellow {
  echo -e "\033[93m $1 \033[0m"
}

printYellow Cleaning...

deleteFolders node_modules dist distPreRenders .serverless

deleteFiles *.lock *.log *.error

printGreen PASS