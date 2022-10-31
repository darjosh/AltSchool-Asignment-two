// import './contactStyle.css'

const Contact = () => {
  return (
    
    <form style={{marginTop: '5%'}}>
    <div className="login-page">
        <h1>Login Page</h1>
        <p>
            <label for="Username">Username</label> 
            <input type="text" name="username" />
        </p>
        <p>
            <label for="password">Password</label> 
            <input type="password" name="password" />
        </p> 
        <button className="btn-click" id="submitBtn">Submit</button>
        
    </div>
    </form>
   
  )
}

export default Contact