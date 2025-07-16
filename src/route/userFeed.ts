import express from 'express';
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from '../services/aws/dynamoClient';
import _ from 'lodash'; 

const router = express.Router()
const TABLE_NAME = 'DateIdeas'

router.get('/userFeed', async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const result = await ddb.send(command);
    const allItems = result.Items || [];
    const randomItems = _.sampleSize(allItems, 50)

    res.status(200).json({
      ideas: randomItems,
    });
  } catch (error) {
    console.error("Error fetching ideas from DynamoDB", error)
    res.status(500).json({ error: 'Failed to fetch ideas' })
  }
});

export default router;
