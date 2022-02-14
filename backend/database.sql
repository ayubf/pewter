CREATE DATABASE pewterdb;

CREATE TABLE users(
    Id SERIAL PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    userName TEXT NOT NULL UNIQUE,
    userPass TEXT NOT NULL,
    joinDate DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE posts(
    userId INT NOT NULL, 
    Id SERIAL PRIMARY KEY,
    postTitle TEXT NOT NULL,
    postUrl TEXT NOT NUll,
    postContent TEXT,
    views INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    datePosted DATE NOT NULL DEFAULT CURRENT_DATE
);

