import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

const CreateAccountPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if ( !password || !confirmPassword || (password !== confirmPassword) ) {
        setError('Password and confirm password do not match.');
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate('/articles');
    } catch (e) {
      setError(e);
    }
  }

  return (
    <>
      <h1>Register</h1>
      {error && <p className='error'> {error} </p> }
      <input type='email' placeholder='Your email address' value={email} onChange={e => setEmail(e.target.value)}/>
      <input type='password' placeholder='Your Password' value={password} onChange={e => setPassword(e.target.value)} />
      <input type='password' placeholder='Re-enter Your Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <button onClick={createAccount}>Create Account</button>
      <Link to='/login'> Already ave an account? Log in here.</Link>
    </>
  )
}

export default CreateAccountPage