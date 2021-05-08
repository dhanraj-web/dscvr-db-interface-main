import Footer from './footer';
import NavBar from './NavBar';

export default function Page({ children }) {
  return (
    <>
      <div className="main-body">
        <NavBar />
        <div className="right-main">
          {children}
          <Footer />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
