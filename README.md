## backend

## MYSQL DB
  use "docker-compose up" if mysql is not installed in your system.
  
# 19/1/2021
## Role-based Authentication

1. login query is changed into auth_login. It returns the same jwt token but with the user_role encoded into it.

## changes to be adapted by backend team:
 
 1. For every authenticated mutation specify a optional parameter (until this migration period) with the role (INT)
 
      1 - HOD
      
      2 - Staff
      
      3 - Student
      
 The auth function is changed accordingly that only the user with required previlege will be allowed to perform the mutation.
 
 eg: 
 
            async createPersonExperience(parent, {data}, {prisma,auth,req}, info) {
 
            const {Experience_ID,Designation_Ref,Emp_Category_Ref,Work_Nature_Ref, ...noref_data} = data
            const ref_data = noref_data
            
            const Person_ID = auth(req,2)  // role-based auth change

here 2 is the staff previlege and the user's with previlege less than 2 will not be able to perform this mutation. 

