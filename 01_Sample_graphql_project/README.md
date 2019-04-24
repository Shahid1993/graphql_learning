
## Welcome to GraphiQL
GraphiQL is an in-browser tool for writing, validating, and testing GraphQL queries.

GraphQL queries typically start with a `{` character. Lines that starts with a `#` are ignored.

An example GraphQL query might look like:
```
{
 field(arg: "value") {
  subField
 }
}
```


### Keyboard shortcuts:
- __Prettify Query:__  `Shift-Ctrl-P` (or press the prettify button above)
- __Run Query:__  `Ctrl-Enter` (or press the play button above)
- __Auto Complete:__  `Ctrl-Space` (or just start typing)



### type Query {...}
- is an object holding the functions that will be mapped to GraphQL queries;
- used to fetch data(equivalent to `GET` in REST)



### type Mutation {...}
- holds functions that will be mapped to mutaions;
- used to create, update or delete data(equivalent to `POST`, `UPDATE` and `DELETE` in REST).


#### Sample Queries :
```
{
  user(id: 1) {
    name
    age
    project
  }
}
```

```
query{
  user(id:1){
    name
    age
    project
  }
}
```

```
query getSingleUser{
  user(id:1){
    name
    age
    project
  }
}
```

```
query getSingleUser($userId :Int!){
  user(id:$userId){
    name
    age
    project
  }
}

Query variables :

{ 
    "userID":1
}
```



### Aliases :::::::
```
{
  user1 :user(id:1){
    name
    age
    project
  },
  user2 : user(id:2){
    name
    project
  }  
}
```

```
query getUsersWithAliases($userIdA :Int!, $userIdB: Int!){
  userA :user(id:$userIdA){
    name
    age
    project
  },
  userB : user(id:$userIdB){
    name
    project
  }
  
}

Query Variables :

{
  "userIdA": 1,
  "userIdB": 2
}
```

### Fragments::::::::::::::::::
- reusable units that let you construct sets of fields, and then include them in queries where you need to.

```
{
  user1: user(id: 1) {
    ...userFields
  }
  user2: user(id: 2) {
    ...userFields
  }
}

fragment userFields on Person {
  name
  age
  project
}
```

### Directives::::::::::::::::
- enable us to dynamically change the structure and shape of our queries using variables. 
  - @include(if: Boolean)
  - @skip(if: Boolean)
  
```
query getUsers($project:String, $id:Boolean!, $age:Boolean!){
  users(project:$project){
    ...userFields
  }
}

fragment userFields on Person {  
  id@include(if:$id)
  name
  age@skip(if:$age)
  project
}

Query variables :

{
  "project": "manage",
  "id":true,
  "age":true
}
```

### Mutations :::::::::::::::::::::::::::::::::
- deal with creating, deleting and updating of data.

```
mutation updateUser($id:Int!, $name:String!, $age:String){
  updateUser(id:$id, name:$name, age:$age){
    ...userFields
  }
}

fragment userFields on Person{
  name
  age
  project
}

Query variables:

{
  "id": 1,
  "name":"Senthil Jayaprakash",
  "age": "32"
}
```

```
mutation addUser($id: Int!,
$name: String!,
$age: String!,
$project: String!){
  addUser(
    id:$id, name: $name,
    age:$age, project:$project
  ){
  ...userFields
}
}

fragment userFields on Person{
  id
  name
  age
  project
}

Query variables:

{
  "id": 99,
  "name": "Test Emp",
  "age": "18",
  "project": "Test Project"
}
```
