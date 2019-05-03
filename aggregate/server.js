const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const url = '';
const dbName = '';

const aggregateRestaurants = function(db, callback) {
	var cursor = db.collection('restaurant').aggregate(
	[
		{$group: {"_id": "$borough", "count": {$sum: 1}}}
	]
	).toArray(function(err, result) {
		assert.equal(err,null);
		console.log(result);
		callback(result);
	});
};

const client = new MongoClient(url);
client.connect(function(err) {
	assert.equal(null,err);
	console.log("Connected successfully to server");
	
	const db = client.db(dbName);
	aggregateRestaurants(db,function(){
		 client.close();
	});
});