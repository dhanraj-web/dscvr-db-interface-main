import Page from "../components/Page";

const Configuration = () => {
  return (
    <Page title="DSCVR">
      <div className="page-heding mb-5">
        <div className="page-heding-left ">
          <span>V0.1.3 UNISWAP POOL TOOLS </span>
          <h1>Tools Configuration </h1>
          <span>Search for new pools, add or remove liquidity in a pair. </span>
        </div>
      </div>
      <div className="setting-div">
        <div className="setting-box">
          <h5>Configurable Parameters </h5>
          <div className="toggel-div p-3 mb-3">
            <h6>
              Disable hot pairs movement <p>Enable / Disable </p>
            </h6>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggel-div p-3 mb-3">
            <h6>
              Browser Notifications <p>Enable or Disable notifications. </p>
            </h6>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggel-div p-3 mb-3">
            <h6>
              Select language <p> Change interface language </p>
            </h6>
            <select className="form-control">
              <option> English</option>
              <option> Hindi</option>
            </select>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Configuration;
