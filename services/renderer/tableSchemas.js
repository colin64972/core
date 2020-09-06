require('dotenv').config()

module.exports = [
  {
    TableName: process.env.TABLE_NAME,
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
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 1
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: process.env.TABLE_GLOBAL_SECONDARY_INDEX_NAME,
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
    ]
  }
]
