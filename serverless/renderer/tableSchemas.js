require('dotenv').config()

module.exports = [
  {
    TableName: process.env.RENDERS_TABLE_NAME,
    AttributeDefinitions: [
      {
        AttributeName: 'domain',
        AttributeType: 'S'
      },
      {
        AttributeName: 'path',
        AttributeType: 'S'
      },
      {
        AttributeName: 'id',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'domain',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'path',
        KeyType: 'RANGE'
      }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: process.env.RENDERS_TABLE_GLOBAL_SECONDARY_INDEX_NAME,
        KeySchema: [
          {
            AttributeName: 'id',
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
