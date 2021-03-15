# Instructions

### *In this Project makes you have a Mysql database and a backend in Node.js all in localhost.*

## About Node
**This backend uses the following libraries:**

- [**Bcrypt**](https://www.npmjs.com/package/bcrypt)

- [**Cookie-parser**](https://www.npmjs.com/package/cookie-parser)

- [**Express**](https://www.npmjs.com/package/express)

- [**Express-group-routes**](https://www.npmjs.com/package/express-group-routes)

- [**Express-session**](https://www.npmjs.com/package/express-session)

- [**Mysql2**](https://www.npmjs.com/package/mysql2)

- [**Nodemon**](https://www.npmjs.com/package/nodemon)

- [**Socket.io**](https://www.npmjs.com/package/socket.io)

- [**Sequelize**](https://www.npmjs.com/package/sequelize)

## About Database
See more in: [Docker Mysql](https://hub.docker.com/_/mysql)

## Important (!!!)
Open your docker-compose.yml file to edit for your taste - ;D

## Important Docker Commands
To turn on all container's:

```docker-compose up```

To list all container's (to see the id's):

```docker ps```

To enter in a Container:

```docker exec -it [container-id] bash```

### Load Dump (Database Scripts)
Before you turn on your container's:
- Delete all files in data directory (./mysql/data)
- Put your dump file in the folder "scripts" with the name "1-init.sql"

If you want add some more scripts:
- Just put the files at the same folder and increase the order number by one to docker run's into an order.

Examples: 1-init.sql, 2-init.sql, 3-init.sql, ...

## Credentials
Credentials Database:

    hostname: localhost
    port: 3306
    dbname: mysql
    username: root
    password: root

Credentials to put in your project:

    host     = "mysql"; // Container's Name
    dbname   = "mysql";
    user     = "root";
    password = "root";

## Docker Commands
Docker Commands for clean your containers.

Stop all containers:

```docker kill $(docker ps -q)```

Remove all containers

```docker rm $(docker ps -a -q)```

Remove all docker images

```docker rmi $(docker images -q)```
