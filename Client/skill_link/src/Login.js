function Login(){
  <style>

  </style>
    return(
        <>
          <div className="container  rounded" >
            <div className="row d-flex justify-content-center max-width-300">
                <div className="col-md-2">
                </div>
                <div className="col-md-5  ">
                      <div class="row">
                        <div class="col-3  ">
                          <img class="img-fluid rounded" src="logo.jpg" width="150px" height="150px"></img>
                        </div>
                        <div class="col-9 ">
                      <img class="img-fluid " src="user.png" width="90px" height="30px"/><br>
                      </br>
                      <h1>Sign In</h1>
                        </div>
                      </div>
                </div>
                <div className="col-md-5">
                </div>
               
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-2">

                </div>
                <div className="col-md-5  p-3">
                     <div>
                     <p >User Name</p>
                     <input type='name' placeholder='Enter First name' className="rounded p-1" required/>
                     </div>
                    
                     <div>
                     <p >Email Address</p>
                     <input type="email" placeholder="Enter Email"className="rounded p-1"required/>
                     </div>
                    
                     <div >
                     <p >Password</p>
                     <input type="password" placeholder="Enter password"className="rounded p-1"required/>
                     <p >Conform Password</p>
                     <input type="conform password"placeholder="conform password" className="rounded p-1"required/>
                     </div>
                     <div>
                      <p>Address:</p>
                      <textarea rows="2" cols="25" placeholder="Enter Address" className="rounded p-1"></textarea>
                     </div>
                     <button type="submit" class="rounded p-1 bg-success " style={{marginLeft:"100px"}}>Submit</button>
                </div>
                   

                <div className="col-md-5">

                </div>
              </div>
         </div>

        
        </>
    )
}
export default Login;