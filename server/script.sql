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

INSERT INTO CATEGORY(CATEGORY_ID, CATEGORY_NAME,CATEGORY_DESCRIPTION) VALUES
(1, "Công Nghệ Thông Tin","CNTT"),
(2, "Cơ Điện Tử","CĐT"),
(3, "Cơ Khí","Cơ Khí"),
(4, "Môi Trường", "MT"),
(5, "Điện Tử Viễn Thông", "ĐTVT"),
(6, "Linh Tinh", "LT");

INSERT INTO STATUS(STATUS_ID, STATUS_NAME) VALUES
(1, "Waiting"),
(2, "Approved"),
(3, "Rejected");

INSERT INTO ROLE(ROLE_ID, ROLE_NAME) VALUES
(1, "Admin"),
(2, "Librarian"),
(3, "User"),
(4, "Guess");

INSERT INTO USERACTION(ACTION_ID, ACTION_NAME) VALUES
(1, "Login"),
(2, "Logout"),
(3, "Changed info");

INSERT INTO BOOKACTION(ACTION_ID, ACTION_NAME) VALUES
(1, "Uploaded"),
(2, "Downloaded"),
(3, "Added_favorite"),
(4, "Approved"),
(5, "Rejected"),
(6, "Edited"),
(7, "Viewed");

INSERT INTO USER(USER_NAME,USER_PASSWORD,USER_SALT,USER_EMAIL,USER_FULLNAME,USER_ADDRESS,USER_PHONE, USER_ROLE) VALUES ("Guess","Guess","Guess","Guess","Guess","Guess","Guess",4);

select * from USER;
select BOOK.*, COUNT FROM BOOK 
LEFT JOIN (select BOOKLOG.BOOK_ID from BOOKLOG)
on BOOK.BOOK_ID = BOOK_ID;

-- 
-- SET FOREIGN_KEY_CHECKS = 0;
-- 
-- DROP TABLE IF EXISTS BOOK;
-- DROP TABLE IF EXISTS BOOKACTION;
-- DROP TABLE IF EXISTS BOOKLOG;
-- DROP TABLE IF EXISTS CATEGORY;
-- DROP TABLE IF EXISTS ROLE;
-- DROP TABLE IF EXISTS STATUS;
-- DROP TABLE IF EXISTS USER;
-- DROP TABLE IF EXISTS USERACTION;
-- DROP TABLE IF EXISTS USERLOG;
-- SET FOREIGN_KEY_CHECKS = 1
-- 


CREATE TEMPORARY TABLE IF NOT EXISTS VIEWCOUNT AS 
(SELECT BOOK_ID, COUNT(LOG_ID) as COUNT 
FROM BOOKLOG 
where ACTION_ID=7
group by BOOK_ID);

SELECT BOOK.*, VIEWCOUNT.COUNT as VIEWS
FROM 
BOOK LEFT JOIN VIEWCOUNT 
ON BOOK.BOOK_ID = VIEWCOUNT.BOOK_ID;

DROP TABLE VIEWCOUNT;

SELECT BOOK.* FROM 
BOOK 
LEFT JOIN BOOKLOG
ON BOOK.BOOK_ID = BOOKLOG.BOOK_ID
WHERE USER_ID = 1;

SELECT * FROM BOOK where BOOK_NAME REGEXP "b" AND CATEGORY_ID = 1;