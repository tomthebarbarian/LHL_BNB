INSERT INTO users (name, email, password) VALUES ('tom', 'abc@123.C.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Mike', 'mike@123.C.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('JIM', 'jimmyboi@123.C.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Johnathan', 'JJBA@123.C.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Homeboi', 'fllwtrain@123.C.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (
  owner_id , title , description , thumbnail_photo_url , cover_photo_url , 
  cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms, 
  country, street, city, province, post_code, active) 
VALUES (1, 'Blank corner' ,'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 85234, 6, 6, 7,'Canada', '651 Nami Road' ,'Bohbatev', 'Alberta' ,83680, TRUE),
(2, 'Habit mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 46058, 0, 5, 6, 'Canada' , '1650 Hejto Center' , 'Genwezuj', 'Newfoundland And Labrador',44583, TRUE),
 (4, 'Headed know', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 82640, 0, 5, 5,'Canada' , '513 Powov Grove', 'Jaebvap' , 'Ontario',38051, TRUE),
(3, 'Port out', 'description', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg', 2358, 2, 8, 0, 'Canada' , '1392 Gaza Junction', 'Upetafpuv', 'Nova Scotia',81059, TRUE);

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES  (1, 1, '2018-09-11', '2018-09-26'),
(1, 1, '2018-05-11', '2018-05-26'),
(1, 1, '2018-10-20', '2018-10-23');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (2, 2, 1 , 3 , 'messages'),
 (1, 3, 2 , 3 , 'messages'),
 (2, 1, 3 , 3 , 'messages');