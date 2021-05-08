import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Page from '../components/Page';
import ApiConfig from '../Config/ApiConfig';
import axios from 'axios';
import moment from 'moment';
import { CriculerLoader } from '../components/PageLoader';
import TostMsg from '../components/TostMsg';
import { TostMsgFun } from '../ComoonFunctions/index';
const accessToken = window.localStorage.getItem('accessToken');

export default function CoinDetails() {
  let location = useLocation();
  console.log('location', location);
  const [tostMsg, setTostMsg] = useState('');

  const [coinData, setCoinData] = useState();
  const [isLoadingUp, setIsLoadingUp] = useState(false);
  const [isLoadingDown, setIsLoadingDown] = useState(false);
  const [datalist, setdatalist] = useState([]);
  const [selectedIdUp, setSelectedIdUp] = useState('');
  const [selectedIdDown, setSelectedIdDown] = useState('');
  useEffect(() => {
    setCoinData(location.state.data);
    setdatalist(location.state.dataList);
    getData(location.state.data._id);
  }, [location]);

  const [coinDetails, setcoinDetails] = useState([]);

  const getDataList = async () => {
    // setIsLoading(true);
    try {
      const res = await axios.get(ApiConfig.getDataListing, {
        headers: {
          token: accessToken,
        },
      });

      if (res.data.response_code !== 200) {
        setdatalist([]);
      } else {
        console.log('res', res);

        setdatalist(res.data.result);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
    // setIsLoading(false);
  };

  const getData = async (id) => {
    try {
      const res = await axios.get(`${ApiConfig.viewData}/${id}`, {
        headers: {
          token: accessToken,
        },
      });
      if (res.data.response_code !== 200) {
        setcoinDetails([]);
      } else {
        console.log('res', res);

        setCoinData(res.data.result);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const voteUpHandler = async (dataId) => {
    setSelectedIdUp(dataId);
    setIsLoadingUp(true);
    try {
      const res = await axios.post(
        ApiConfig.upVote,
        {
          dataId: dataId,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      console.log('res', res);
      if (res.data.response_code !== 200) {
        setTostMsg(res.data.response_message);
        TostMsgFun();
      } else {
        setTostMsg(res.data.response_message);
        TostMsgFun();
        getDataList();
        getData(dataId);
        console.log('res', res);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
    setIsLoadingUp(false);
  };

  const voteDownHandler = async (dataId) => {
    setSelectedIdDown(dataId);
    setIsLoadingDown(true);
    try {
      const res = await axios.post(
        ApiConfig.downVote,
        {
          dataId: dataId,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      console.log('res', res);
      if (res.data.response_code !== 200) {
        setTostMsg(res.data.response_message);
        TostMsgFun();
      } else {
        setTostMsg(res.data.response_message);
        TostMsgFun();
        getData(dataId);
        getDataList();
        console.log('res', res);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
    setIsLoadingDown(false);
  };

  return (
    <Page title="DSCVR">
      <TostMsg tostMsg={tostMsg} />

      <div className="right-main2">
        <div className="page-heding mb-5">
          <div className="page-heding-left">
            <h1>Project Details</h1>
          </div>
        </div>
        <div className="coin-detail-div">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xl-8 mb-3">
              <div className="shiba">
                {' '}
                <img
                  src={
                    coinData && coinData.projectlogo
                      ? coinData.projectlogo
                      : 'images/image.png'
                  }
                  height="30"
                  width="30"
                  alt=""
                />{' '}
                <b>{coinData && coinData.projectName}</b>{' '}
              </div>
              <h5 className="mt-3 mb-2">
                <i className="fa fa-calendar  pr-2" aria-hidden="true"></i>{' '}
                TOKEN SALE: {coinData && moment(coinData.date).format('D MMM')}
              </h5>
              {/* <!-- <h2 className="mt-3">BitMart Listing </h2>  */}
              {/* <button className="btn exchange mt-3 mb-3">Exchange</button><br/> --> */}
              <label>{coinData && coinData.summary}</label>
              <div className="token-s-s mb-2 mt-4">
                {' '}
                Ticker: <strong>{coinData && coinData.blockchain}</strong>
              </div>
              <div className="token-s-s mb-2">
                {' '}
                Token type: <strong>ERC20</strong>
              </div>
              <div className="token-s-s mb-2">
                {' '}
                Total tokens: <strong>500,000,000</strong>
              </div>
              <div className="token-s-s mb-2">
                {' '}
                Seed price: <strong>{coinData && coinData.seedPrice}</strong>
              </div>
              <div className="token-s-s mb-2">
                {' '}
                Private sale price:{' '}
                <strong>{coinData && coinData.privateSalePrice}</strong>
              </div>
              <div className="token-s-s mb-2">
                {' '}
                Public sale price:{' '}
                <strong>{coinData && coinData.publicSalePrice}</strong>
              </div>
              <div className="token-s-s mb-2">
                {' '}
                Listing price:{' '}
                <strong>{coinData && coinData.listingPrice}</strong>
              </div>
              <div className="token-s-s mb-2">
                {' '}
                Token address (when applicable) :{' '}
                <strong>{coinData && coinData.tokenAddress}</strong>
              </div>
              {/* <div className="token-s-s mb-2">
                {' '}
                (Link to Etherscan token address)
                <strong>efchcrech2458kffnni</strong>
              </div> */}
              <div className="token-s-s mb-2">
                {' '}
                Blockchain:<strong>{coinData && coinData.blockchain}</strong>
              </div>
              <div className="token-s-s mb-2">
                {' '}
                Category :<strong>{coinData && coinData.category}</strong>
              </div>
              <div className="token-s-s mb-2">
                {' '}
                Project type :
                <strong>{coinData && coinData.projectType}</strong>
              </div>
              <h5 className="mt-5 mb-2">
                <i className="fa fa-link" aria-hidden="true"></i> ADDITIONAL
                LINKS
              </h5>
              <div className="token-s-s mb-2 mt-4">
                <a
                  href="javascript:void(0)"
                  onClick={() =>
                    coinData && coinData.whitepaper
                      ? window.open(coinData.whitepaper)
                      : null
                  }
                  target="_blank"
                >
                  - Whitepaper{' '}
                  <i className="fa fa-external-link" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div className="col-md-12 col-lg-12 col-xl-4  ">
              <div
                className=" coin-card mb-3 text-left"
                style={{ minHeight: 215 }}
              >
                <div className="token-div-div text-center">
                  <h3 className="mt-2">${coinData && coinData.hardcap} </h3>
                  <span>RECEIVED</span> <br />
                  <button
                    className="mt-3 mb-3 btn website-btn"
                    onClick={() =>
                      coinData && coinData.website
                        ? window.open(coinData.website)
                        : null
                    }
                  >
                    {' '}
                    Website
                  </button>{' '}
                  <br />
                  <span>social links </span>
                  <div>
                    <i
                      className="fa fa-twitter pr-2"
                      aria-hidden="true"
                      onClick={() =>
                        coinData && coinData.twitter
                          ? window.open(coinData.twitter)
                          : null
                      }
                    ></i>
                    <i
                      className="fa fa-paper-plane pr-2"
                      aria-hidden="true"
                      onClick={() =>
                        coinData && coinData.telegram
                          ? window.open(coinData.telegram)
                          : null
                      }
                    ></i>
                    <i
                      className="fa fa-github pr-2"
                      aria-hidden="true"
                      onClick={() =>
                        coinData && coinData.github
                          ? window.open(coinData.github)
                          : null
                      }
                    ></i>
                  </div>
                </div>
              </div>
              <div className="coin-card" style={{ minHeight: 215 }}>
                <h6>Validation</h6>
                <ul className="vote-s-ul">
                  <li>
                    <div className="">
                      <label>Confidence</label>
                      {coinData && (
                        <h2>
                          {parseInt(coinData.upVoteCount) +
                            parseInt(coinData.downVoteCount) ===
                          0
                            ? 0
                            : parseFloat(
                                (parseInt(coinData.upVoteCount) /
                                  (parseInt(coinData.upVoteCount) +
                                    parseInt(coinData.downVoteCount))) *
                                  100
                              ).toFixed(2)}
                          %
                        </h2>
                      )}
                    </div>
                    <label className="up-btn-div justify-content-center">
                      <button
                        className="btn btn-up mt-3"
                        disabled={isLoadingUp && selectedIdUp === coinData._id}
                        onClick={() => voteUpHandler(coinData && coinData._id)}
                      >
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>{' '}
                        Up{' '}
                        {isLoadingUp && selectedIdUp === coinData._id && (
                          <CriculerLoader />
                        )}
                      </button>
                    </label>
                  </li>
                  <li>
                    <div>
                      <label>Vote</label>
                      <h2>
                        {coinData &&
                          parseInt(coinData.upVoteCount) +
                            parseInt(coinData.downVoteCount)}
                      </h2>
                    </div>
                    <label className="up-btn-div justify-content-center">
                      <button
                        className="btn btn-down mt-3"
                        disabled={
                          isLoadingDown && selectedIdDown === coinData._id
                        }
                        onClick={() =>
                          voteDownHandler(coinData && coinData._id)
                        }
                      >
                        <i className="fa fa-thumbs-down" aria-hidden="true"></i>{' '}
                        Down{' '}
                        {isLoadingDown && selectedIdDown === coinData._id && (
                          <CriculerLoader />
                        )}
                      </button>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="nav nav-pills mb-4 mt-5" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="pills-upcoming-tab"
                data-toggle="pill"
                href="#pills-upcoming"
                role="tab"
                aria-controls="pills-upcoming"
                aria-selected="true"
              >
                Other upcoming events
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-events-tab"
                data-toggle="pill"
                href="#pills-events"
                role="tab"
                aria-controls="pills-events"
                aria-selected="false"
              >
                Other past events
              </a>
            </li>
            {/* <!-- <li className="nav-item">
                  <a className="nav-link" id="pills-news-tab" data-toggle="pill" href="#pills-news" role="tab" aria-controls="pills-news" aria-selected="false">Related News</a>
                </li> --> */}
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-upcoming"
              role="tabpanel"
              aria-labelledby="pills-upcoming-tab"
            >
              <div className="table-responsive ">
                <table className="table vote-table mb-0">
                  <tbody>
                    {datalist &&
                      datalist.length > 0 &&
                      datalist.map((data, i) => {
                        if (+new Date(data.date) > +new Date()) {
                          return (
                            <tr className={(i + 1) % 2 === 0 ? '' : ''} key={i}>
                              <td style={{ textAlign: 'left' }}>
                                <img
                                  src={
                                    data.projectlogo
                                      ? data.projectlogo
                                      : 'images/image.png'
                                  }
                                  className="product-img mr-2"
                                  alt=""
                                />{' '}
                                {data.projectName}
                              </td>
                              <td>
                                <h5>
                                  {moment(data.date).format('D MMM, yy')}{' '}
                                  {/* <i
                                    className="fa fa-calendar pl-3 pr-2"
                                    aria-hidden="true"
                                  ></i>
                                  <i
                                    className="fa fa-clock-o pr-2 pl-2"
                                    aria-hidden="true"
                                    data-toggle="modal"
                                    data-target="#reminder"
                                  ></i>
                                  <i
                                    className="fa fa-bell-o pr-2 pl-2"
                                    aria-hidden="true"
                                    data-toggle="modal"
                                    data-target="#alert"
                                  ></i> */}
                                </h5>
                                <h4>
                                  {data.category}{' '}
                                  <i
                                    className="fa fa-level-up"
                                    aria-hidden="true"
                                    style={{ color: 'red' }}
                                  ></i>
                                </h4>
                              </td>
                              <td>
                                <h3>
                                  {parseInt(data.upVoteCount) +
                                    parseInt(data.downVoteCount) ===
                                  0
                                    ? 0
                                    : parseFloat(
                                        (parseInt(data.upVoteCount) /
                                          (parseInt(data.upVoteCount) +
                                            parseInt(data.downVoteCount))) *
                                          100
                                      ).toFixed(2)}
                                  % <label>Confidence</label>
                                </h3>
                              </td>
                              <td>
                                <h3>
                                  {parseInt(data.upVoteCount) +
                                    parseInt(data.downVoteCount)}{' '}
                                  <label>Votes</label>
                                </h3>
                              </td>
                              <td>
                                <div className="up-btn-div">
                                  <button
                                    className="btn btn-up mt-3"
                                    disabled={
                                      isLoadingUp && selectedIdUp === data._id
                                    }
                                    onClick={() =>
                                      voteUpHandler(data && data._id)
                                    }
                                  >
                                    <i
                                      className="fa fa-thumbs-up"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    Up{' '}
                                    {isLoadingUp &&
                                      selectedIdUp === data._id && (
                                        <CriculerLoader />
                                      )}
                                  </button>
                                  <button
                                    className="btn btn-down mt-3 ml-3"
                                    disabled={
                                      isLoadingDown &&
                                      selectedIdDown === data._id
                                    }
                                    onClick={() =>
                                      voteDownHandler(data && data._id)
                                    }
                                  >
                                    <i
                                      className="fa fa-thumbs-down"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    Down{' '}
                                    {isLoadingDown &&
                                      selectedIdDown === data._id && (
                                        <CriculerLoader />
                                      )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-events"
              role="tabpanel"
              aria-labelledby="pills-events-tab"
            >
              <div className="table-responsive ">
                <table className="table vote-table mb-0">
                  <tbody>
                    {datalist &&
                      datalist.length > 0 &&
                      datalist.map((data, i) => {
                        if (+new Date(data.date) < +new Date()) {
                          return (
                            <tr className={(i + 1) % 2 === 0 ? '' : ''} key={i}>
                              <td
                                className="index-td"
                                style={{ textAlign: 'left' }}
                              >
                                <img
                                  src={
                                    data.projectlogo
                                      ? data.projectlogo
                                      : 'images/image.png'
                                  }
                                  className="product-img mr-2"
                                  alt=""
                                />{' '}
                                {data.projectName}
                              </td>
                              <td>
                                <h5>
                                  {moment(data.date).format('D MMM, yy')}{' '}
                                  {/* <i
                                    className="fa fa-calendar pl-3 pr-2"
                                    aria-hidden="true"
                                  ></i>
                                  <i
                                    className="fa fa-clock-o pr-2 pl-2"
                                    aria-hidden="true"
                                    data-toggle="modal"
                                    data-target="#reminder"
                                  ></i>
                                  <i
                                    className="fa fa-bell-o pr-2 pl-2"
                                    aria-hidden="true"
                                    data-toggle="modal"
                                    data-target="#alert"
                                  ></i> */}
                                </h5>
                                <h4>
                                  {data.category}{' '}
                                  <i
                                    className="fa fa-level-up"
                                    aria-hidden="true"
                                    style={{ color: 'red' }}
                                  ></i>
                                </h4>
                              </td>
                              <td>
                                <h3>
                                  {parseInt(data.upVoteCount) +
                                    parseInt(data.downVoteCount) ===
                                  0
                                    ? 0
                                    : parseFloat(
                                        (parseInt(data.upVoteCount) /
                                          (parseInt(data.upVoteCount) +
                                            parseInt(data.downVoteCount))) *
                                          100
                                      ).toFixed(2)}
                                  % <label>Confidence</label>
                                </h3>
                              </td>
                              <td>
                                <h3>
                                  {parseInt(data.upVoteCount) +
                                    parseInt(data.downVoteCount)}{' '}
                                  <label>Votes</label>
                                </h3>
                              </td>
                              <td>
                                <div className="up-btn-div">
                                  <button
                                    className="btn btn-up mt-3"
                                    disabled={
                                      isLoadingUp && selectedIdUp === data._id
                                    }
                                    onClick={() =>
                                      voteUpHandler(data && data._id)
                                    }
                                  >
                                    <i
                                      className="fa fa-thumbs-up"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    Up{' '}
                                    {isLoadingUp &&
                                      selectedIdUp === data._id && (
                                        <CriculerLoader />
                                      )}
                                  </button>
                                  <button
                                    className="btn btn-down mt-3 ml-3"
                                    disabled={
                                      isLoadingDown &&
                                      selectedIdDown === data._id
                                    }
                                    onClick={() =>
                                      voteDownHandler(data && data._id)
                                    }
                                  >
                                    <i
                                      className="fa fa-thumbs-down"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    Down{' '}
                                    {isLoadingDown &&
                                      selectedIdDown === data._id && (
                                        <CriculerLoader />
                                      )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      })}{' '}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <!-- <div className="tab-pane fade" id="pills-news" role="tabpanel" aria-labelledby="pills-news-tab">
                </div> --> */}
          </div>
        </div>
      </div>
    </Page>
  );
}
