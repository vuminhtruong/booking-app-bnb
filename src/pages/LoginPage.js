import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";


export default function LoginPage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [login,setLogin] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleSubmit(e){
      e.preventDefault();
      try {
        const {data} = await axios.post('http://localhost:4000/login',{
          email,
          password
        });
        setUser(data);
        // alert('Login succesful');
        setLogin(true);
      } catch(e) {
        // alert('Login failed');
        console.log(e);
      }
    }

    if(login) {
      return <Navigate to={'/'} />;
    }

    return (
        <div className="mt-4 grow flex justify-center items-center">
          <div className="mb-32 ml-8">
            <h1 className="text-4xl text-center">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <input type={"email"} placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type={"password"} placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button className="bg-rose text-white w-full my-1 py-1 rounded-2xl text-xl">Login</button>
                <div className="text-center my-1">
                  Don't have an account yet? <Link to={'/register'} className='underline font-bold'>Register now</Link>
                </div>
            </form>
          </div>
        </div>
    );
}   