import Lottie from "@/components/lottie";
import styles from "./page.module.css";
import animationData from "./lottie/first-screen-mint.json";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  let backgroundColor = "mint";
  let isSafariDesktop = true;
  return (
    <div className={styles["signin"]}>
      <div className={styles["form"]}>
        <div className={styles["form-wrapper"]}>
          <div className="mb-32">
            <Link href="/" className={styles['header-logo']}>
              <img src="/logo.svg" alt="qonto" width={100} height={30} />
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
            <a href="https://welcome.qonto.com" className="body-1">
              Open an account
            </a>
          </div>
        </div>
      </div>
      <div className={`${styles["illustration"]} ${styles[backgroundColor]}`}>
        <div className={styles["illustration-wrapper"]}>
          <Lottie
            className={`${styles["animsation"]}`}
            autoplay={isSafariDesktop}
            animationData={animationData}
            data-test-lottie-signin-animation={true}
          />
        </div>
      </div>
    </div>
  );
}
