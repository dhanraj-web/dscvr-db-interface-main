import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ApiConfig from '../Config/ApiConfig';
import { CriculerLoader } from './PageLoader';
import { AuthContext } from '../context/Auth';
import {
  isValidEmail,
  isValidNumber,
  isValidPassword,
  isBlank,
  TostMsgFun,
} from '../ComoonFunctions/index';
import TostMsg from './TostMsg';
export default function Header() {
  const auth = useContext(AuthContext);
  const [topTenCounList, settoptenCounList] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ethBTCValue, setEthBTCValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [tostMsg, setTostMsg] = useState('');
  const [ErrorMsg, setErrorMsg] = useState('');
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  useEffect(() => {
    getData();
    getMarketCap();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(ApiConfig.cmcTopTen);
      if (res.data.responseCode !== 200) {
        settoptenCounList([]);
      } else {
        console.log('res', res);
        settoptenCounList(res.data.responseResult.data);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const getMarketCap = async () => {
    try {
      const res = await axios.get(`${ApiConfig.getMarketCapSymbol}/ETH,BTC`);
      if (res.data.responseCode !== 200) {
      } else {
        console.log('DATA', res);
        setEthBTCValue(res.data.responseResult.data);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const logInHandler = async (e) => {
    setIsLoading(true);
    try {
      const res = await axios.post(ApiConfig.login, {
        email: email,
        password: password,
      });
      console.log('res', res);
      if (res.data.response_code !== 200) {
        setErrorMsg(res.data.response_message);
      } else {
        setErrorMsg('');
        console.log('res', res);
        auth.userLogIn(true, res.data.result.token, res.data.result);
        setTostMsg(res.data.response_message);
        TostMsgFun();
        window.$('#login').modal('hide');
      }
    } catch (err) {
      console.log('ERROR', err);
    }
    setIsLoading(false);
  };

  const signupHandler = async (e) => {
    setIsSubmit(true);
    setIsLoading(true);
    try {
      const res = await axios.post(ApiConfig.signup, {
        email: formValue.email,
        password: formValue.password,
        name: formValue.name,
        mobileNumber: formValue.mobileNumber,
        userName: formValue.email,
      });
      console.log('res', res);
      if (res.data.response_code !== 200) {
        setErrorMsg(res.data.response_message);
      } else {
        setErrorMsg('');
        console.log('res', res);
        setTostMsg(res.data.response_message);
        TostMsgFun();
        window.$('#signUp').modal('hide');
      }
    } catch (err) {
      console.log('ERROR', err);
    }
    setIsLoading(false);
  };

  return (
    <div className="row top-div">
      <TostMsg tostMsg={tostMsg} />
      <div className="col-md-12 col-lg-2 pr-0">
        {' '}
        <label>
          BTC : $
          {ethBTCValue &&
            parseFloat(ethBTCValue.BTC.quote.USD.price).toFixed(2)}
        </label>
        <label>
          ETH : $
          {ethBTCValue &&
            parseFloat(ethBTCValue.ETH.quote.USD.price).toFixed(2)}
        </label>
      </div>
      <div className="col-md-12 col-lg-7">
        <marquee>
          {' '}
          {topTenCounList &&
            topTenCounList.length > 0 &&
            topTenCounList.map((data, i) => {
              return (
                <label key={i}>
                  #{i + 1}{' '}
                  {/* <i
                      className="fa fa-angle-double-up"
                      aria-hidden="true"
                      style={{ color: 'green' }}
                    ></i> */}
                  {data.symbol}{' '}
                </label>
              );
            })}
        </marquee>
      </div>
      <div className="col-md-12 col-lg-3 p-0">
        <img src="images/logo.png" style={{ width: 80 }} alt="" />
        {/* <b>DSCVR</b>{' '} */}
        {auth.userLoggedIn ? (
          <button onClick={() => window.$('#logout').modal('show')}>
            {' '}
            Logout
          </button>
        ) : (
          <button onClick={() => window.$('#login').modal('show')}>
            {' '}
            Login
          </button>
        )}

        {!auth.userLoggedIn && (
          <button onClick={() => window.$('#signUp').modal('show')}>
            Sign Up
          </button>
        )}
      </div>

      {/* Logout */}
      <>
        <div
          className="modal fade"
          id={'logout'}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered " role="document">
            <div className="modal-content">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  padding: 50,
                  backgroundColor: '#10171f',
                  minWidth: 600,
                }}
              >
                <div className="mb-3">
                  <h4 style={{ textAlign: 'center' }}>Logout</h4>
                </div>
                <div className="add-div">
                  <h5 style={{ textAlign: 'center' }}>Are you sure?</h5>
                </div>
                <hr></hr>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <div style={{ display: 'flex' }} className="mt-2">
                    <button
                      className="btn connect login-btn"
                      onClick={() => {
                        auth.userLogIn(false, null);
                        window.$('#logout').modal('hide');
                      }}
                    >
                      Yes {isLoading && <CriculerLoader />}
                    </button>
                    <button
                      className="btn connect login-btn"
                      onClick={() => {
                        window.$('#logout').modal('hide');
                      }}
                    >
                      Calcel {isLoading && <CriculerLoader />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* Login */}
      <>
        <div
          className="modal fade"
          id={'login'}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered " role="document">
            <div className="modal-content">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  padding: 50,
                  backgroundColor: '#10171f',
                  minWidth: 600,
                }}
              >
                <div className="mb-2">
                  <h4 style={{ textAlign: 'center' }}>Login</h4>
                </div>
                <div className="add-div">
                  <form>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={email}
                        type="text"
                        className="form-control"
                        placeholder="Enter project name"
                        name="projectName"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        value={password}
                        type="password"
                        className="form-control"
                        placeholder="Enter project name"
                        name="projectName"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <p className="error">{ErrorMsg !== '' && ErrorMsg}</p>
                  </form>
                </div>
                <hr></hr>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <div>
                    <button
                      className="btn connect login-btn"
                      onClick={logInHandler}
                    >
                      Login {isLoading && <CriculerLoader />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* Sign UP */}
      <>
        <div
          className="modal fade"
          id={'signUp'}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered " role="document">
            <div className="modal-content">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  padding: 50,
                  backgroundColor: '#10171f',
                  minWidth: 600,
                }}
              >
                <div className="mb-2">
                  <h4 style={{ textAlign: 'center' }}>Sign Up</h4>
                </div>
                <div className="add-div">
                  <form>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter project name"
                        onChange={_onInputChange}
                      />
                      {isSubmit && isBlank(formValue.name) && (
                        <p className="error">Enter name</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Enter project name"
                        onChange={_onInputChange}
                      />
                      {isSubmit &&
                        (isBlank(formValue.email) ||
                          !isValidEmail(formValue.email)) && (
                          <p className="error">Enter email</p>
                        )}
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input
                        type="text"
                        name="mobileNumber"
                        className="form-control"
                        placeholder="Enter project name"
                        onChange={_onInputChange}
                      />
                      {isSubmit &&
                        (isBlank(formValue.mobileNumber) ||
                          !isValidNumber(formValue.mobileNumber)) && (
                          <p className="error">Enter mobile number</p>
                        )}
                    </div>
                    {/* <div className="form-group">
                      <label>User Name</label>
                      <input
                        type="text"
                        name="userName"
                        className="form-control"
                        placeholder="Enter project name"
                        onChange={_onInputChange}
                      />
                      {isSubmit && isBlank(formValue.userName) && (
                        <p className="error">Enter user name</p>
                      )}
                    </div> */}
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter project name"
                        onChange={_onInputChange}
                      />{' '}
                      {isSubmit &&
                        (isBlank(formValue.password) ||
                          !isValidPassword(formValue.password)) && (
                          <p className="error">Enter password</p>
                        )}
                    </div>

                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Enter project name"
                        onChange={_onInputChange}
                      />
                      {isSubmit && isBlank(formValue.confirmPassword) && (
                        <p className="error">Please confirm password</p>
                      )}
                      {isSubmit &&
                        formValue.confirmPassword !== '' &&
                        formValue.confirmPassword !== formValue.password && (
                          <p className="error">Password must be match</p>
                        )}
                    </div>
                    <p className="error">{ErrorMsg !== '' && ErrorMsg}</p>
                  </form>
                </div>
                <hr></hr>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <div>
                    <button
                      className="btn connect login-btn"
                      onClick={() => signupHandler()}
                    >
                      Sign Up{isLoading && <CriculerLoader />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
