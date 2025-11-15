// local
import style from "./welcome.module.css";

function WelcomePage() {
  return (
    <>
      <div className={style.welcomePage}>
        <div className={style.header}>
          <div className={style.headerOverlay}></div>
          <h2>Simple Counter</h2>
        </div>
        <div className={style.paragraph}>
          <p>A simple tool for counting things, by mohamed fayed</p>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
