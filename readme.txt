
---------------- products routes ---------------------

1. post  http://localhost:8080/product/add

2. get  http://localhost:8080/product/searchByCategory/:cat

3. get http://localhost:8080/product/getall

4. post http://localhost:8080/product/update/:pid

5. post http://localhost:8080/product/addreview:pid

6. get http://localhost:8080/product/getproduct/:pid

7. delete http://localhost:8080/product/deleteproduct:pid




------------------ user routes ---------------------------

1. get http://localhost:8080/user/getalluser

2. post http://localhost:8080/user/create

3. post http://localhost:8080/user/login

5. post http://localhost:8080/user/resetpasswordbyemail

6. post http://localhost:8080/user/resetpasswordbyphone

8. get http://localhost:8080/user/addtocart/:id-:pid

9. get http://localhost:8080/user/addtowishlist/:id-:pid

10. get http://localhost:8080/user/addtoorder/:id-:pid

11. delete http://localhost:8080/user/addtoorder:id-:pid



--------------------- order routes --------------------------

11. post http://localhost:8080/order/makeOrder

12 post http://localhost:8080/order/updateorder/:oid

13. get http://localhost:8080/order/getall


