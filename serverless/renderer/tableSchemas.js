require('dotenv').config()

module.exports = {
  rendersTableSchema: {
    TableName: process.env.RENDERS_TABLE_NAME,
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S'
      },
      {
        AttributeName: 'domain',
        AttributeType: 'S'
      },
      {
        AttributeName: 'path',
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
        IndexName: process.env.RENDERS_TABLE_GLOBAL_SECONDARY_INDEX_NAME,
        Projection: {
          ProjectionType: 'KEYS_ONLY'
        },
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
}
