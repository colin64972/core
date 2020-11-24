#!/bin/bash

. ~/.bash_functions --source-only

printYellow Cleaning...

deleteFolders node_modules dist distPreRenders distRenders .serverless

deleteFiles *.lock *.log *.error

printGreen PASS