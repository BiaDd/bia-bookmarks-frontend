import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from "../context/AuthContext.tsx";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);

      if (result.success) {
        navigate("/dashboard")
      }
    }
    catch (err) {
      setError("an error occured");
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"'>💩 Bookmarks</h1>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create an account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="email" className="flex justify-start text-sm/6 font-medium text-gray-900">Email address</label>
            <div className="mt-2">
              <input
                onChange={(e) => { setEmail(e.target.value) }}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-start">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => { setPassword(e.target.value) }}
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account? <Link to="/login" className='font-semibold text-indigo-600 hover:text-indigo-500'>Sign In</Link>
        </p>
        {error && <p className='text-red-600 text-center pt-4'>{error}</p>}
      </div>
    </div>
  )
}

export default Signup