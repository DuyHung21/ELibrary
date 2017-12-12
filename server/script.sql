CREATE DATABASE e_library;
USE e_library;
CREATE TABLE CATEGORY (
 CATEGORY_ID INT  NOT NULL AUTO_INCREMENT,
 CATEGORY_NAME VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
 CATEGORY_DESCRIPTION TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
 PRIMARY KEY(CATEGORY_ID)
);
CREATE TABLE STATUS (
 STATUS_ID TINYINT  NOT NULL AUTO_INCREMENT,
 STATUS_NAME VARCHAR(50) NOT NULL UNIQUE,
 PRIMARY KEY(STATUS_ID)
);
CREATE TABLE ROLE (
 ROLE_ID  TINYINT  NOT NULL AUTO_INCREMENT,
 ROLE_NAME VARCHAR(50) NOT NULL UNIQUE,
 PRIMARY KEY(ROLE_ID)
);

CREATE TABLE USER (
 USER_ID  INT  NOT NULL AUTO_INCREMENT,
 USER_NAME VARCHAR(50) NOT NULL UNIQUE,
 USER_PASSWORD VARCHAR(200) NOT NULL,
 USER_SALT VARCHAR(100) NOT NULL,
 USER_EMAIL VARCHAR(50) NOT NULL UNIQUE,
 USER_FULLNAME VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
 USER_ADDRESS VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci,
 USER_PHONE VARCHAR(11),
 USER_DATE_CREATED DATETIME NOT NULL DEFAULT NOW(),
 USER_IS_ACTIVE  TINYINT  NOT NULL DEFAULT "1",
 USER_ROLE  TINYINT NOT NULL DEFAULT "3",

 PRIMARY KEY(USER_ID),
 
 FOREIGN KEY(USER_ROLE)
  REFERENCES ROLE(ROLE_ID)  
);
CREATE TABLE BOOK (
 BOOK_ID  INT  NOT NULL AUTO_INCREMENT,
 BOOK_NAME VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
 BOOK_AUTHOR VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
 BOOK_DESCRIPTION TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
 CATEGORY_ID INT  NOT NULL,
 BOOK_STATUS TINYINT  NOT NULL DEFAULT "1",
 FIRST_PAGE_URL VARCHAR(100) NOT NULL,
 DEMO_URL VARCHAR(100) NOT NULL,
 BOOK_URL VARCHAR(100) NOT NULL,
 
 PRIMARY KEY(BOOK_ID),

 FOREIGN KEY(CATEGORY_ID)
  REFERENCES CATEGORY(CATEGORY_ID),
 FOREIGN KEY(BOOK_STATUS)
  REFERENCES STATUS(STATUS_ID)
);
CREATE TABLE USERACTION (
  ACTION_ID TINYINT NOT NULL AUTO_INCREMENT,
  ACTION_NAME VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
  
  PRIMARY KEY(ACTION_ID)
);
CREATE TABLE BOOKACTION (
  ACTION_ID TINYINT NOT NULL AUTO_INCREMENT,
  ACTION_NAME VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
  
  PRIMARY KEY(ACTION_ID)
);
CREATE TABLE USERLOG (
 LOG_ID  INT  NOT NULL AUTO_INCREMENT,
 USER_ID  INT  NOT NULL,
 ACTION_ID TINYINT NOT NULL,
 LOG_DATE_CREATED DATETIME NOT NULL DEFAULT NOW(),
 IP_ADDRESS VARCHAR(30),  
 
 PRIMARY KEY(LOG_ID),
 
 FOREIGN KEY(ACTION_ID)
  REFERENCES USERACTION(ACTION_ID),
 FOREIGN KEY(USER_ID)
  REFERENCES USER(USER_ID)
);
CREATE TABLE BOOKLOG (
  LOG_ID INT NOT NULL AUTO_INCREMENT,
  USER_ID INT NOT NULL,
  BOOK_ID INT NOT NULL,
  ACTION_ID TINYINT NOT NULL,
  LOG_DATE_CREATED DATETIME NOT NULL DEFAULT NOW(),
  
  PRIMARY KEY(LOG_ID),
  FOREIGN KEY(USER_ID)
  REFERENCES USER(USER_ID),
  FOREIGN KEY(BOOK_ID)
  REFERENCES BOOK(BOOK_ID),
  FOREIGN KEY (ACTION_ID)
  REFERENCES BOOKACTION(ACTION_ID)
);

INSERT INTO CATEGORY(CATEGORY_NAME,CATEGORY_DESCRIPTION) VALUES
("cnnt","cnnt"),
("dien","dien"),
("nhiet","nhiet");
	
INSERT INTO STATUS(STATUS_NAME) VALUES
("Waiting"),
("Approved"),
("Rejected");

INSERT INTO ROLE(ROLE_NAME) VALUES
("Admin"),
("Librarian"),
("User"),
("Guess");

INSERT INTO USERACTION(ACTION_NAME) VALUES
("Login"),
("Logout"),
("Changed info");

INSERT INTO BOOKACTION(ACTION_NAME) VALUES
("Uploaded"),
("Downloaded"),
("Added_favorite"),
("Approved"),
("Rejected"),
("Edited"),
("Viewed");

select * from USER