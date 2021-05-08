import Page from "../components/Page";

const User_account = () => {
  return (
    <Page title="DSCVR">
      <div className="page-heding mb-5">
        <div className="page-heding-left ">
          <span>V0.1.3 UNISWAP POOL TOOLS </span>
          <h1>User Account </h1>
          <span>User Account </span>
        </div>
      </div>
      <div className="setting-div">
        <div className="row user-div ">
          <div className="col-md-12 col-lg-6">
            <div className="user-box text-center active">
              <h4>Connect your Wallet </h4>
              <p className="mt-5 mb-5">Connect your wallet with Dextools. </p>
              <a href="/user-account-connect">
                <button className="btn theme-btn">Connect</button>
              </a>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="user-box text-center">
              <h4>Verify your wallet</h4>
              <p className="mt-3 mb-3">Verify your wallet into Dextools.io </p>
              <p className=" mb-3">
                By verifying your wallet we will validate the ownership of your
                wallet.{" "}
              </p>
              <button className="btn theme-btn off btn-5">
                {" "}
                Verify your wallet{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default User_account;
