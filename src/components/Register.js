import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const EMAIL_REGEX = /^(.{6,})@(gmail\.com|mail\.ru)$/i;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/auth/registration';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [lastName, setlastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [patronymic, setPatronymic] = useState('');
    const [validPatronymic, setValidPatronymic] = useState(false);
    const [patronymicFocus, setPatronymicFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidLastName(USER_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidPatronymic(USER_REGEX.test(patronymic));
    }, [patronymic])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidEmail = EMAIL_REGEX.test(email);
        const isValidUser = USER_REGEX.test(user);
        const isValidLastName = USER_REGEX.test(lastName);
        const isValidPatronymic = USER_REGEX.test(patronymic);
        const isValidPwd = PWD_REGEX.test(pwd);

        if (!isValidEmail || !isValidUser || !isValidLastName ||
            !isValidPatronymic || !isValidPwd) {
            setErrMsg('Invalid Entry');
            return;
        }

        try {
            const response = await axios.post(
                REGISTER_URL,
                {
                    userEmail: email,
                    firstName: user,
                    lastName: lastName,
                    patronymic: patronymic,
                    password: pwd
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setSuccess(true);
            setEmail('');
            setUser('');
            setlastName('');
            setPatronymic('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Success!</h1>
                    <p>
                        <Link to="/" className="text-blue-500">Sign In</Link>
                    </p>
                </section>
            ) : (
                <section className="text-center">
                    <Link to="/" className="absolute right-4 top-4 bg-blue-500 px-4 py-2 text-white rounded">
                        Come back
                    </Link>

                    <p ref={errRef} className={`text-red-500 ${errMsg ? '' : 'hidden'}`} aria-live='assertive'>{errMsg}</p>
                    <h1 className="text-4xl font-bold mb-4">Register</h1>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        {/* ... other form elements ... */}
                        <label htmlFor='email' className="block mt-4">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={`text-green-500 ml-2 ${validEmail ? '' : 'hidden'}`} />
                            <FontAwesomeIcon icon={faTimes} className={`text-red-500 ml-2 ${validEmail || !user ? 'hidden' : ''}`} />
                        </label>
                        <input
                            type='email'
                            id='email'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby='emailnote'
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            className="border border-gray-300 px-3 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
                        />
                        <p id='emailnote' className={`text-sm text-gray-600 ${emailFocus && email && !validEmail ? '' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            Invalid email format.<br />
                            Please make sure the email has more than 6 characters and ends with: <br />
                            @gmail.com <br />
                            or <br />
                            @mail.ru.
                        </p>

                        <label htmlFor='username' className="block mt-4">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={`text-green-500 ml-2 ${validName ? '' : 'hidden'}`} />
                            <FontAwesomeIcon icon={faTimes} className={`text-red-500 ml-2 ${validName || !user ? 'hidden' : ''}`} />
                        </label>
                        <input
                            type='text'
                            id='username'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className="border border-gray-300 px-3 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
                        />
                        <p id='uidnote' className={`text-sm text-gray-600 ${userFocus && user && !validName ? '' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor='lastname' className="block mt-4">
                            Lastname:
                            <FontAwesomeIcon icon={faCheck} className={`text-green-500 ml-2 ${validLastName ? '' : 'hidden'}`} />
                            <FontAwesomeIcon icon={faTimes} className={`text-red-500 ml-2 ${validLastName || !lastName ? 'hidden' : ''}`} />
                        </label>
                        <input
                            type='text'
                            id='lastname'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setlastName(e.target.value)}
                            value={lastName}
                            required
                            aria-invalid={validLastName ? 'false' : 'true'}
                            aria-describedby='lstnameNote'
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                            className="border border-gray-300 px-3 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
                        />
                        <p id='lstnameNote' className={`text-sm text-gray-600 ${lastNameFocus && lastName && !validLastName ? '' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor='patronymic' className="block mt-4">
                            Patronymic:
                            <FontAwesomeIcon icon={faCheck} className={`text-green-500 ml-2 ${validPatronymic ? '' : 'hidden'}`} />
                            <FontAwesomeIcon icon={faTimes} className={`text-red-500 ml-2 ${validPatronymic || !patronymic ? 'hidden' : ''}`} />
                        </label>
                        <input
                            type='text'
                            id='patronymic'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setPatronymic(e.target.value)}
                            value={patronymic}
                            required
                            aria-invalid={validPatronymic ? 'false' : 'true'}
                            aria-describedby='patronymicNote'
                            onFocus={() => setPatronymicFocus(true)}
                            onBlur={() => setPatronymicFocus(false)}
                            className="border border-gray-300 px-3 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
                        />
                        <p id='patronymicNote' className={`text-sm text-gray-600 ${patronymicFocus && patronymic && !validPatronymic ? '' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor='password' className="block mt-4">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={`text-green-500 ml-2 ${validPwd ? '' : 'hidden'}`} />
                            <FontAwesomeIcon icon={faTimes} className={`text-red-500 ml-2 ${validPwd || !pwd ? 'hidden' : ''}`} />
                        </label>
                        <input
                            type='password'
                            id='password'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? 'false' : 'true'}
                            aria-describedby='pwdnote'
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className="border border-gray-300 px-3 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
                        />
                        <p id='pwdnote' className={`text-sm text-gray-600 ${pwdFocus && !validPwd ? '' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number, and a special character.<br />
                            Allowed special characters:
                            <span aria-label='exclamation mark'>!</span>
                            <span aria-label='at symbol'>@</span>
                            <span aria-label='hashtag'>#</span>
                            <span aria-label='dollar sign'>$</span>
                            <span aria-label='percent'>%</span>
                        </p>

                        <label htmlFor='confirm_pwd' className="block mt-4">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={`text-green-500 ml-2 ${validMatch && matchPwd ? '' : 'hidden'}`} />
                            <FontAwesomeIcon icon={faTimes} className={`text-red-500 ml-2 ${validMatch || !matchPwd ? 'hidden' : ''}`} />
                        </label>
                        <input
                            type='password'
                            id='confirm_pwd'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby='confirmnote'
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className="border border-gray-300 px-3 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
                        />
                        <p id='confirmnote' className={`text-sm text-gray-600 ${matchFocus && !validMatch ? '' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            Must match the first password input field.
                        </p>

                        {/* ... other form elements ... */}

                        <button
                            disabled={!validName || !validPwd || !validMatch}
                            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-3"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4">
                        Already registered?<br />
                        <span className='line'>
                            <Link to="/login" className="text-blue-500">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>

    )
}

export default Register