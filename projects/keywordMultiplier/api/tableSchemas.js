require('dotenv').config()

module.exports = [
  {
    TableName: process.env.TABLE_NAME,
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S'
      },
      {
        AttributeName: 'ipAddress',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: process.env.TABLE_GSI_INDEX_NAME,
        KeySchema: [
          {
            AttributeName: 'ipAddress',
            KeyType: 'HASH'
          }
        ],
        Projection: {
          ProjectionType: 'KEYS_ONLY'
        },
        ProvisionedThroughput: {
          WriteCapacityUnits: 1,
          ReadCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      WriteCapacityUnits: 1,
      ReadCapacityUnits: 5
    }
  }
]
