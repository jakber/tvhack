drop schema public cascade;
create schema public;


create table impression(id serial, viewer integer, video integer, created timestamp);
create table viewer(id serial, token varchar);
create table video(id serial, url varchar, title varchar);



