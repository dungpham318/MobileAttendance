import React, { useState, useEffect } from 'react'
import logo from '../../assets/images/logo.png'
import img_login from '../../assets/images/img_login.svg'
import Button from '../custom/Button'
import TextField from '../custom/TextField'
import usePrevious from '../../functions/usePrevious'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { API_URL } from '../../config/setting'
// import { Redirect, useHistory } from 'react-router-dom'
const Login = (props) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('fis.tdc.hcm')
  const [password, setPassword] = useState('123123')
  const prevLoadingDelete = usePrevious(props.loadingLogin)
  // const history = useHistory()
  // useEffect(() => {
  //   if (prevLoadingDelete && !props.loadingLogin) {
  //     if (props.errorLogin !== undefined && props.errorLogin !== null) {
  //       alert(props.errorLogin)
  //     } else if (props.responseLogin !== null && props.responseLogin !== undefined) {
  //       if (props.responseLogin.resultCode === -1) {
  //         alert(props.responseLogin.message)
  //       } else {
  //         console.log(new Date().getTime(), new Date().getTime() + (3600000 * 24))
  //         localStorage.setItem('token', props.responseLogin.accessToken);
  //         localStorage.setItem('userCode', props.responseLogin.uid);
  //         localStorage.setItem('username', props.responseLogin.username);
  //         localStorage.setItem('tokenExpired', (new Date().getTime() + 3600000 * 24));
  //         navigate.push("/fisinsight/admin/dashboard")
  //       }
  //     }
  //   }
  // }, [props.loadingLogin]);

  const onLogin = () => {
    navigate("/fisinsight/admin/dashboard")

    // props.loginAction({
    //   "username": username,
    //   "password": password
    // })
  }

  const responseGoogle = async (response) => {
    console.log(response?.tokenId)
    if (response?.tokenId === undefined) {
      alert('Google Error')
    } else {
      let result = await loginApi(response?.tokenId)
      if (result === -1) {
        alert(result.message)
      } else {
        if (result?.data?.userData?.role === 'Admin') {
          localStorage.setItem('token', result?.data?.token);
          localStorage.setItem('email', result?.data?.userData?.email);
          localStorage.setItem('name', result?.data?.userData?.name);
          localStorage.setItem('role', result?.data?.userData?.role);
          localStorage.setItem('icon', result?.data?.userData?.icon);
          navigate("/mbAttendance/admin")
        }
      }
    }
  }

  const loginApi = async (input) => {
    let url = '/lecture/login'
    return fetch(API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${userProfile.token}`,
      },
      body: JSON.stringify({
        emailToken: input
      })
    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <div className='flex flex-auto flex-row items-center justify-center h-screen w-screen px-32'>

      <div className='flex flex-col flex-initial items-start px-20'>
        <img
          className='w-20 py-4'
          src={logo}
        />
        <span className='text-text font-text text-2xl font-black'>
          Sign in to your account
        </span>
        {/* <span className='text-left font-text text-sm font-bold text-text py-1 px-1 mt-3'>Username</span>
        <TextField
          className='mx-0.5 my-0.5 py-3 flex w-96'
          container='my-0.5'
          onChange={(text) => {
            setUsername(text)
          }}
          value={username}
        />

        <span className='text-left font-text text-sm font-bold text-text py-1 px-1 mt-3'>Password</span>
        <TextField
          className='mx-0.5 my-0.5 py-3 w-96'
          container='my-0.5'
          type='password'
          onChange={(text) => {
            setPassword(text)
          }}
          value={password}
        />

        <Button
          className='w-96'
          label='Sign in'
          onClick={() => {
            onLogin()
          }}
        /> */}
        <span className='text-left font-text text-sm font-bold text-text py-1 px-1 mt-3'></span>
        <GoogleLogin
          clientId="1039209918487-4u4orng4ii1m9csn6ocn8jmav6aoq0bc.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          style={{
            marginTop: '1em'
          }}
        />
      </div>
      <div className='flex flex-col flex-1'>

        <img
          className=''
          src={img_login}
        />

      </div>


    </div>
  )



}

export default Login
