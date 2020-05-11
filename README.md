# lru-caching-service

Initial commit for the least recently used caching service.

## Getting Started
- Run the server with `npm start`
- The internal cache system has a default capacity of `10`, you can change that. 

## Usage

- **Read a key from the cache**
```
GET /cache/someKey HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```
- **Write some key-value pairs to the cache**
```
POST /cache HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
	"one": "one",
	"two":  "two"
}
```

- **You can write any JSON type as value to the cache**
```
POST /cache HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
	"one": "one",
	"two":  {
        "empId": 1098,
        "firstName": "first name",
        "lastName": "last name",
        "email": "test@btest.com",
        "telephone": "mmmmm",
        "role": "owner",
        "id": null
    }
}
```

- **Remove a key from the cache **
```
Delete /cache/someKey HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
	"one": "one",
	"two":  {
        "empId": 1098,
        "firstName": "first name",
        "lastName": "last name",
        "email": "test@btest.com",
        "telephone": "mmmmm",
        "role": "owner",
        "id": null
    }
}
```
