export default function Page() {
  return (
    <div className="l-container__app">
      <div className="signin">
        <div className="form">
          <div className="form-wrapper">
            <div className="header-logo mb-32">
              {/* <Link to="/signin">
                <img src={require('../assets/images/qonto.svg')} alt="qonto" />
              </Link> */}
            </div>
            <h1 className="title-2 mb-32">Welcome back!</h1>
            {/* {this.shouldShowSpinnerOverlay && (
              <QSpinner
                className="q-spinner--overlay"
                data-test-register-connect-provider-loading
              />
            )} */}
            {/* <AuthButtons
              onSignInGoogleSuccess={this.onGoogleSignInSuccessTask}
              onSignInAppleSuccess={this.onAppleSignInSuccessTask}
            /> */}
            {/* <LoginForm
              local-form="inputs"
              className="mb-32"
              authenticate={this.authenticateTask}
            /> */}
            <div className="links mb-32">
              <span className="no-account-label body-2">Don't have an account?</span>
              {/* <a href={this.registerJsURL} className="m-link m-link--black body-1" data-test-register-link>
                Register now
              </a> */}
            </div>
          </div>
        </div>
        {/* {!this.deviceManager.isMobile && (
          <div className={`illustration ${this.backgroundColor}`}>
            <div className="illustration-wrapper">
              <Lottie
                className={`animation ${!this.animationReady && 'hidden'}`}
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
