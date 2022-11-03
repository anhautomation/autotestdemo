
import { MongoClient, ObjectId } from "mongodb";

const uri = "";
const client = new MongoClient(uri);

export const deleteCollectionByObjectId = async (objectId: string) => {
  try {
    const database = client.db("sof");
    const transactionSources = database.collection("transaction_sources");

    const query = { _id: new ObjectId(objectId) };
    const result = await transactionSources.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    await client.close();
  }
}
