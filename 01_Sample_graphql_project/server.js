var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


/*//Initialize a graphQL Schema
var schema = buildSchema(`
	type Query {
		hello : String
	}

	`);

//Root Resolver
var root = {
	hello : () => 'Hello World!'
};*/

var users = [
	{
		id : 1,
		name : 'senthil j',
		age : '35',
		project: 'CH'
	},
	{
		id : 2,
		name : 'shamsheer',
		age : '30',
		project : 'manage'
	},
	{
		id : 3,
		name : 'bharath',
		age : '28',
		project : 'accessibility'
	},
	{
		id : 4,
		name: 'JP',
		age : '27',
		project : 'PCH'
	},
	{
		id : 5,
		name : 'Chella',
		age : '27',
		project : 'collaborate'
	},
	{
		id : 6,
		name : 'Rajat',
		age : '25',
		project : 'manage'
	},
	{
		id : 7,
		name : 'selvam',
		age : '27',
		project : 'manage'
	},
	{
		id : 8,
		name : 'senthil ms',
		age : '45',
		project : 'accessibility'
	},
];

var schema = buildSchema(`
	type Query {
		user(id : Int!): Person
		users(project : String): [Person]
	},

	type Person {
		id : Int
		name : String
		age : Int
		project : String
	},

	type Mutation {
		updateUser(id: Int!, name: String!, age: String): Person
		addUser(id: Int!, name: String!, age: String!, project: String!): Person
	}
`);

var getUser = function(args){
	var userID = args.id;
	return users.filter(user => {
		return user.id === userID
	})[0];
};

var retrieveUsers = function(args){
	if(args.project){
		var project = args.project;
		return users.filter(user => user.project === project)
	}else{
		return users
	}
};

var updateUser = function({id, name, age}){
	users.map(user => {
		if(user.id == id){
			user.name = name;
			user.age = age;
			return user;
		}
	});

	return users.filter(user => user.id === id)[0]
};

var addUser = function({id, name, age, project}){

	users.push({
		id:id,
		name:name,
		age:age,
		project:project
	});

	return users.filter(user => user.id === id)[0];
}

var root = {
	user : getUser,
	users : retrieveUsers,
	updateUser : updateUser,
	addUser : addUser
};












//Create an express server and a GraphQL endpoint
var app = express();

app.use('/graphql', graphqlHTTP({
	schema: schema,   //Must be provided
	rootValue: root,
	graphiql: true    //Enable GraphiQL when server endpoint is accessed in browser
}))

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));