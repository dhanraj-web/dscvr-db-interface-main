import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
function openNav() {
  document.getElementById('mySidenav').style.width = '100%';
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0%';
}
export default function NavBar() {
  const history = useHistory();
  const currentPage = history.location.pathname;
  return (
    <>
      <span className="open-btn" onClick={openNav}>
        &#9776;{' '}
      </span>
      <div className="side-menu " id="mySidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &#8592;
        </a>
        <div className="logo">
          {' '}
          <Link to="/">
            <img src="images/logo.png" alt="" />
          </Link>
        </div>
        <ul className="">
          <li
            className={` ${currentPage === '/' ? 'active' : null}`}
            // data-wow-delay="0.1s"
          >
            <Link to="/">
              {' '}
              <img
                src="images/home.png"
                className="nonactive-img"
                alt=""
              />{' '}
              <img src="images/home-active.png" className="active-img" alt="" />
              <span> DSCVR Dashboard</span>
            </Link>
          </li>

          <li class="">
            <a
              href="https://ethereum.mobiloitte.com/"
              target="_blank"
              rel="noreferrer"
            >
              {' '}
              <img
                src="images/Launchpad.png"
                class="nonactive-img"
                alt=""
              />{' '}
              <img
                src="images/Launchpad-active.png"
                class="active-img"
                alt=""
              />{' '}
              <span>DSCVR Launchpad</span>
            </a>
          </li>

          <li
            className={` ${currentPage === '/database' ? 'active' : null}`}
            // data-wow-delay="0.1s"
          >
            <Link to="/database">
              {' '}
              <img
                src="images/database.png"
                className="nonactive-img"
                alt=""
              />{' '}
              <img
                src="images/database-active.png"
                className="active-img"
                alt=""
              />
              <span> DSCVR Database</span>
            </Link>
          </li>

          <li
            className={` ${currentPage === '/pool-explorer' ? 'active' : null}`}
            // data-wow-delay="0.50s"
          >
            <Link to="/pool-explorer">
              {' '}
              <img
                src="images/explorer.png"
                className="nonactive-img"
                alt=""
              />{' '}
              <img
                src="images/explorer-active.png"
                className="active-img"
                alt=""
              />{' '}
              <span>Pool Explorer</span>
            </Link>
          </li>
          <li
            className={` ${currentPage === '/pair-explorer' ? 'active' : null}`}
            // data-wow-delay="0.50s"
          >
            <Link to="/pair-explorer?0x9af4fb969bb16038d7618df8adbdb2e7133b0f66">
              {' '}
              <img
                src="images/pair-explorer.png"
                className="nonactive-img"
                alt=""
              />{' '}
              <img
                src="images/pair-explorer-active.png"
                className="active-img"
                alt=""
              />
              <span> Pair Explorer</span>
            </Link>
          </li>
          <li
            className={` ${currentPage === '/big-swap' ? 'active' : null}`}
            // data-wow-delay="0.50s"
          >
            {' '}
            <Link to="/big-swap">
              <img src="images/big-swap.png" className="nonactive-img" alt="" />{' '}
              <img
                src="images/big-swap-active.png"
                className="active-img"
                alt=""
              />{' '}
              <span>Big Swap Explorer</span>
            </Link>
          </li>

          <li
            className={` ${currentPage === '/nft-zone' ? 'active' : null}`}
            // data-wow-delay="0.50s"
          >
            <Link to="/nft-zone">
              {' '}
              <img src="images/nft.png" className="nonactive-img" alt="" />{' '}
              <img src="images/nft-active.png" className="active-img" alt="" />{' '}
              <span>NFT Zone</span>
            </Link>
          </li>

          <li
            className={` ${currentPage === '/whitelist' ? 'active' : null}`}
            // data-wow-delay="0.50s"
          >
            <Link to="/whitelist">
              {' '}
              <img
                src="images/whitelist.png"
                className="nonactive-img"
                alt=""
              />{' '}
              <img
                src="images/whitelist-active.png"
                className="active-img"
                alt=""
              />{' '}
              <span>Open Whitelist</span>
            </Link>
          </li>

          <li
            className={` ${currentPage === '/new-listing' ? 'active' : null}`}
            // data-wow-delay="0.50s"
          >
            <Link to="/new-listing">
              {' '}
              <img
                src="images/listing.png"
                className="nonactive-img"
                alt=""
              />{' '}
              <img
                src="images/listing-active.png"
                className="active-img"
                alt=""
              />{' '}
              <span>New Listing</span>
            </Link>
          </li>

          <li
            className={` ${currentPage === '/air-drops' ? 'active' : null}`}
            // data-wow-delay="0.50s"
          >
            <Link to="/air-drops">
              {' '}
              <img
                src="images/air-drop.png"
                className="nonactive-img"
                alt=""
              />{' '}
              <img
                src="images/air-drop-active.png"
                className="active-img"
                alt=""
              />{' '}
              <span>Air Drops</span>
            </Link>
          </li>

          {/* <li
            className={` ${
              currentPage === '/user-account' ? 'active' : null
            }`}
            data-wow-delay="0.50s"
          >
            <Link to="/user-account">
              {' '}
              <img
                src="images/user.png"
                className="nonactive-img"
                alt=""
              />{' '}
              <img src="images/user-active.png" className="active-img" alt="" />{' '}
              <span>User Account</span>
            </Link>
          </li> */}
          {/* <li
            className={` ${
              currentPage === '/configuration' ? 'active' : null
            }`}
            data-wow-delay="0.50s"
          >
            <Link to="/configuration">
              {' '}
              <img
                src="images/setting.png"
                className="nonactive-img"
                alt=""
              />{' '}
              <img
                src="images/setting-active.png"
                className="active-img"
                alt=""
              />{' '}
              <span>Configuration</span>
            </Link>
          </li> */}
          <li class="">
            <a href="https://coin360.com/" target="_blank" rel="noreferrer">
              {' '}
              <img
                src="images/heat-map.png"
                class="nonactive-img"
                alt=""
              />{' '}
              <img src="images/heat-map-active.png" class="active-img" alt="" />{' '}
              <span>Crypto Heat Map</span>
            </a>
          </li>
          <li class="">
            <a href="https://lunarcrush.com/" target="_blank" rel="noreferrer">
              {' '}
              <img src="images/social.png" class="nonactive-img" alt="" />{' '}
              <img src="images/social-active.png" class="active-img" alt="" />{' '}
              <span>Trending Social</span>
            </a>
          </li>
          <li class="">
            <a
              href="https://app.uniswap.org/#/swap?inputCurrency=0x26ce25148832c04f3d7f26f32478a9fe55197166"
              target="_blank"
              rel="noreferrer"
            >
              {' '}
              <img src="images/buy.png" class="nonactive-img" alt="" />{' '}
              <img src="images/buy-active.png" class="active-img" alt="" />{' '}
              <span>Buy DSCVR</span>
            </a>
          </li>
        </ul>
        <div class="watchlist-menu-div mt-3">
            <div class="page-titel mb-4">
                <img src="images/Watchlist-icon.png"  alt="" /> <h3><span>My </span> Watchlist  </h3>
            </div>
            <div class="table-responsive index-table">
                <table class="table mb-0">
                    <tbody>
                        <tr class="">
                            <td><h5>GLQ</h5> GraphLinq</td>
                            <td class="red-text">$0.050566 </td>
                            <td class=""><img src="images/icon.png" alt="" /></td>
                        </tr>
                        <tr class="secend-tr">
                            <td>BANK</td>
                            <td class="red-text">$0.050566 </td>
                            <td class=""><img src="images/icon.png" alt="" /></td>
                        </tr>
                        <tr class="">
                            <td class="green-text"><i class="fa fa-angle-double-up" aria-hidden="true"></i> ERN</td>
                            <td class="green-text">$0.050566 </td>
                            <td class=""><img src="images/icon.png" alt="" /></td>
                        </tr>
                        <tr class="secend-tr">
                            <td class="red-text"><i class="fa fa-angle-double-down" aria-hidden="true"></i> BANK</td>
                            <td class="red-text">$0.050566 </td>
                            <td class=""><img src="images/icon.png" alt="" /></td>
                        </tr>
                        <tr class="">
                            <td class="green-text"><i class="fa fa-angle-double-up" aria-hidden="true"></i> ERN</td>
                            <td class="green-text">$0.050566 </td>
                            <td class=""><img src="images/icon.png" alt="" /></td>
                        </tr>
                        <tr class="secend-tr">
                            <td class="red-text"><i class="fa fa-angle-double-down" aria-hidden="true"></i> BANK</td>
                            <td class="red-text">$0.050566 </td>
                            <td class=""><img src="images/icon.png" alt="" /></td>
                        </tr>
                        <tr class="">
                            <td class="green-text"><i class="fa fa-angle-double-up" aria-hidden="true"></i> ERN</td>
                            <td class="green-text">$0.050566 </td>
                            <td class=""><img src="images/icon.png" alt="" /></td>
                        </tr>
                        <tr class="secend-tr">
                            <td class="red-text"> <i class="fa fa-angle-double-down" aria-hidden="true"></i> BANK</td>
                            <td class="red-text">$0.050566 </td>
                            <td class=""><img src="images/icon.png" alt="" /></td>
                        </tr>
                        <tr class="">
                            <td class="green-text"> <i class="fa fa-angle-double-up" aria-hidden="true"></i> ERN</td>
                            <td class="green-text">$0.050566 </td>
                            <td class=""><img src="images/icon.png" alt="" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </>
  );
}
