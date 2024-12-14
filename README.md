# SkillLink

#Project Overview

In this we have 3 type of users with following features

1.Student
a) can raise complaints on various issues and describe the complaint in test and also can give images with that complaint
this complaints goes to representative/co-ordinator
b) can see the his/her complaints in dashboard and on clicking on any complaint in table you will get a pop up with more detials
   about that complaint like 
           i)images,description,issue,category
           ii) Time line of complaint
2.Representative
a) can review the complaints raised by students in table and when clicking on any complaint representative will get a pop up showing complaint details like
           i)images,description,issue category
           ii)Timeline 
           iii)user details who raised complaint
after reviewing he/she can  change the status of complaint by clicking on corresponding complaint statsu row button i.e statsu button
b) representative can also raise complaints as students but this complaints goes to admin users
c)can see the dash board in which
      i)bar graph -> represent monthly wise complaints i.e no.of complaints in each month
      ii)pie chart -> represent category wise complaints in current month
      which can help estimate the mess performance for current month by comparig other months in graph and know the major problem category in current month by pie chart 

3.Admin
a)can review and  change status of student or representative complaints
b)same dashboard as in representative log in
c)student complaints forwarded to admin when it is not solved with in 2 days my representatives

->all users can reset their password by getting reset link in email


#Tech Stack Used
we used MERN Stack for complete web development
specifically we used vitejs and converted to progressive web app
vitejs->frontend
mongodb->database
express/nodejs->backend
other frame works->bootstrap
for progressive web app->android studio
converted this website to progressive web app

#Environment variables
all environment variables are declared in specified .env files for both backend and front end

#Deployment links
frontend->https://mess-monetering.vercel.app/
backend->https://messmonetering-production.up.railway.app/



      
