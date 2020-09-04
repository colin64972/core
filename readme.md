# Colin30 Core

## Serverless Packages


### DynamoDb

Serverless packages use DynamoDb for no-SQL data persistance. For use on local, the Java DyanmoDb local progam must be installed and run in separate terminal in order to access the database locally. Download and install the DynamoDb local from these [instructions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html). Extract all files from the zip into the folder `~/dynamodb/` in you MacOS user home directory. To run DynamoDb from your serverless package, use the yarn script `yarn dynamo` which will cd into the `~/dynamodb/` folder and start the program in your terminal.