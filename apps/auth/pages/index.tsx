import Link from "next/link";
import Lottie from "@/components/lottie";
import { LoginForm } from "@/components/login-form";
import animationData from "../public/lottie/first-screen-mint.json";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  const backgroundColor = "mint";
  const isSafariDesktop = true;
  return (
    <div className={styles.signin}>
      <div className={styles.form}>
        <div className={styles["form-wrapper"]}>
          <div className="mb-32">
            <Link className={styles["header-logo"]} href="/">
              <img
                alt="qonto"
                height={30}
                src={`${
                  process.env.PRODUCTION ? "/web-ideal-architecture/auth" : ""
                }/logo.svg`}
                width={100}
              />
            </Link>
          </div>
          <h1 className="title-2 mb-32">Welcome back!</h1>
          {/* <AuthButtons
            onSignInGoogleSuccess={this.onGoogleSignInSuccessTask}
            onSignInAppleSuccess={this.onAppleSignInSuccessTask}
          /> */}
          <LoginForm className="mb-32" />
          <div className={`${styles.links} mb-32`}>
            <span className={`${styles["no-account-label"]} body-2`}>
              Don&apos;t have an account?
            </span>{" "}
            <a className="body-1" href="https://welcome.qonto.com">
              Open an account
            </a>
          </div>
        </div>
      </div>
      <div className={`${styles.illustration} ${styles[backgroundColor]}`}>
        <div className={styles["illustration-wrapper"]}>
          <Lottie
            animationData={animationData}
            autoplay={isSafariDesktop}
            className={`${styles.animsation}`}
            data-testid="lottie-signin-animation"
          />
        </div>
      </div>
    </div>
  );
}
