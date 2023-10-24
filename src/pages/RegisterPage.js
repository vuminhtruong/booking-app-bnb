import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try{
          await axios.post('http://localhost:4000/register',{
          name,
          email,
          password,
        });
        alert("Registration successful.Now you can login");
        } catch(e) {
            alert("Registration failed. Please try again");
        }
    }

    return (
        <div className="mt-4 grow flex justify-center items-center">
          <div className="mb-32">
            <h1 className="text-4xl text-center">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <input type={"text"} placeholder="Truong Vu" value={name} onChange={e => setName(e.target.value)}/>
                <input type={"email"} placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type={"password"} placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button className="bg-rose text-white w-full my-1 py-1 rounded-2xl text-xl">Register</button>
                <div className="text-center my-1">
                  Already a member? <Link to={'/login'} className='underline font-bold'>Login</Link>
                </div>
            </form>
          </div>
        </div>
    );
}   