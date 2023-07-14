import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles['l-container__app']}>
      <div className={styles['signin']}>
        <div className={styles['form']}>
          <div className={styles['form-wrapper']}>
            <div className={`${styles['header-logo']} mb-32`}>
              {/* <Link to="/signin">
                <img src={require('../assets/images/qonto.svg')} alt="qonto" />
              </Link> */}
            </div>
            <h1 className="title-2 mb-32">Welcome back!</h1>
            {/* {this.shouldShowSpinnerOverlay && (
              <QSpinner
                className={`${styles['q-spinner--overlay']}`}
                data-test-register-connect-provider-loading
              />
            )} */}
            {/* <AuthButtons
              onSignInGoogleSuccess={this.onGoogleSignInSuccessTask}
              onSignInAppleSuccess={this.onAppleSignInSuccessTask}
            /> */}
            {/* <LoginForm
              local-form="inputs"
              className={`${styles['mb-32']}`}
              authenticate={this.authenticateTask}
            /> */}
            <div className={`${styles['links']} mb-32`}>
              <span className={`${styles['no-account-label']} body-2`}>Don't have an account?</span>
              {/* <a href={this.registerJsURL} className={`${styles['m-link']} ${styles['m-link--black']} ${styles['body-1']}`} data-test-register-link>
                Register now
              </a> */}
            </div>
          </div>
        </div>
        {/* {!this.deviceManager.isMobile && (
          <div className={`${styles['illustration']} ${styles[this.backgroundColor]}`}>
            <div className={styles['illustration-wrapper']}>
              <Lottie
                className={`${styles['animation']} ${!this.animationReady && styles['hidden']}`}
                autoplay={!this.deviceManager.isSafariDesktop}
                path={require(`../assets/lotties/first-screen-${this.backgroundColor}.json`)}
                onDataReady={() => this.animationReady = true}
                data-test-lottie-signin-animation={true}
              />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
