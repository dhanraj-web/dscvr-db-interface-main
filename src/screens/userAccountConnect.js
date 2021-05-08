import Page from "../components/Page";

const User_account_connect = () => {
  return (
    <Page title="DSCVR">
      <div className="page-heding mb-5">
        <div className="page-heding-left ">
          <span>V0.1.3 UNISWAP POOL TOOLS </span>
          <h1>User Account </h1>
          <span>User Account </span>
        </div>
      </div>
      <div className="user-box-div mb-5">
        <div className=" user-div user-div2">
          <div className="user-div-child">
            <div className="user-box text-center active connect">
              <span>Verified Wallet </span>
              <h6 className="mt-4 mb-3">
                <img src="images/image.png" alt="" />{" "}
                0xc175622dd6352271fEBBb36e07469Bb7E0E7C0d5{" "}
              </h6>
              <p className="mb-3">Balance: 0 DEXT </p>
              <a href="#"> Disconnect wallet</a>
            </div>
          </div>
          <div className="user-div-child mt-3">
            <div className="user-box text-center active connect">
              <label className="mb-3">
                Your wallet does not have an active subscription.{" "}
              </label>
              <div className="step mb-2">
                <div></div> step 1
              </div>
              <p>Transfer 212 DEXT to the following account: </p>
              <a className="link" href="#">
                0x469d342e4f3d9ffbedca2e2ca8ab268a6fe973c3
              </a>{" "}
              <br />
              <small>
                * You need to hold 5000 more DEXT to access a Standard Plan with
                50% of discount.{" "}
              </small>
              <div className="step mt-3 mb-2">
                <div></div> step 2
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  I've already done the transfer
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="plan-div">
        <div className="box active-box">
          <h6 className="mb-3">FREE PLAN </h6>
          <ul>
            <li>Real Time Uniswap Tools </li>
            <li>Pool Explorer </li>
            <li>Pair Explorer </li>
            <li>Bigswap Explorer </li>
          </ul>
        </div>
        <div className="box dall">
          <h6 className="mb-3">STANDARD PLAN </h6>
          <ul>
            <li>All Basic Features </li>
            <li>More Transaction Info </li>
            <li>Wallet Info </li>
            <li>Price Alerts </li>
            <li>Real Time Hot Pairs</li>
          </ul>
        </div>
        <div className="box dall">
          <h6 className="mb-3">PREMIUM PLAN </h6>
          <ul>
            <li>All Standard Features </li>
            <li>DEXTShares (from Dext Subscriptions) </li>
            <li>Access to DextForce Telegram Premium Group</li>
            <li>More Exclusive Upcoming Features</li>
          </ul>
        </div>
      </div>
    </Page>
  );
};
export default User_account_connect;
