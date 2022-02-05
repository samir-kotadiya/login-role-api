### Prerequisite

node: v16.13.2
psql (PostgreSQL) 14.0

### Project Setup
Once you clone or download project go into you folder

>now cope **.env.local** file to **.env** file

### Installing
```
> npm install or yarn install  (this will install all dependent libraries)
```

### Env Config Setup
so in my **.env** file will set below parameters.
```
# DB SETTINGS
DB_NAME=test_db
DB_USER=postgres
DB_PASS=root
DB_PORT=5432
DB_HOST=localhost
SECRET_KEY=F4C31@T
# API PORT
PORT=3000
```
some other inportant parameters/keys in **.env** file
```
PORT=3000               # application port
SECRET_KEY=secret       # secret key for encrypt/decrypt JWT token
```

### Migration and Seeders run
Follow below steps to prepared database

Note: before runing migraion command make sure you have updated proper database details in `migration/config/config.json`
```
> npm run db # it will create database and required talbes with test data
```
Follow below steps to run migration script indivisually
```
> npm run db:create     #it will create database
> npm run db:migration  #it will tables
> npm run db:seed       #it will create test data
````
for more info in sript command in `package.json`

>Everythig is setup and you are good to go test. :)

```
run `npm start`
```

## Some of Example APIs
>here attached link of postman collection you can download and check in local
>https://www.getpostman.com/collections/78abe5acb9db828059ed

Set postman env global variable
HOST_API: http://localhost:3000
AUTH_TOKEN: genrated token

### Login
```
> POST : http:localhost:3000/v1/user/login   
> Payload: email, password
> Response : 
{
    "statusCode": 200,
    "type": "success",
    "message": "OK",
    "data": {
        "status": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0NTYzODlhLTYwNDMtNDI4Zi04MTU4LTMzMDBiNDcyZjk2MSIsImlhdCI6MTY0NDA2NTY2M30.STfvi8WbjfHHjie8kNqYKlAffXPbUEzjeDlgHkHXL5I"
    }
}

```
### Get all public resource
```
> GET : http:localhost:8000/v1/resource/public/all?page=1
> Response : 
{
    "statusCode": 200,
    "type": "success",
    "message": "OK",
    "data": {
        "resources": [
            {
                "id": "95f7a094-68a3-4c34-b793-370a85d957c4",
                "type": "public"
            },
            {
                "id": "6f275bfc-a3aa-42e8-b5a2-a78056deab43",
                "type": "public"
            }
        ],
        "page": "1",
        "totalRecords": 2,
        "totalPages": 1
    }
}

```
### Get all private and admin resource with admin user token
```
> GET : http:localhost:8000/v1/resource/only-admin/all?page=1
> Headers : 
        bearer token (access token)
> Response : 
{
    "statusCode": 200,
    "type": "success",
    "message": "OK",
    "data": {
        "resources": [
            {
                "id": "b8296249-fcc2-479c-8750-98a228021bfe",
                "type": "admin"
            },
            {
                "id": "0bc94d99-db2c-4beb-9c41-669fef36d89c",
                "type": "admin"
            },
            {
                "id": "7bbfc297-e325-4007-899d-9ec01ca5f707",
                "type": "admin"
            },
            {
                "id": "5f455865-7ff0-4da5-908c-7beb3dae688e",
                "type": "admin"
            }
        ],
        "page": "1",
        "totalRecords": 4,
        "totalPages": 1
    }
}

```
### Error Response
```
{
    "statusCode": 400,
    "type": "success",
    "action": "Failed",
    "message": "email not exits"
}

{
    "statusCode": 403,
    "type": "error",
    "message": "Forbidden"
}

{
    "statusCode": 401,
    "type": "error",
    "message": "Token expired"
}