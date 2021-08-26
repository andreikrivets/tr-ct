/* eslint-disable no-unused-vars */
import React from "react";
import env from "react-dotenv";
import GitHubLogin from "react-github-login";

import { LoginSocialFacebook, LoginSocialGithub } from "reactjs-social-login/dist";
import { FacebookLoginButton, GithubLoginButton } from "react-social-login-buttons";

const SocialLogin = () => {
  const { FB_APP_ID, GH_CLIENT_ID } = env;
  return (
    <>
      <LoginSocialFacebook
        appId={FB_APP_ID}
        onResolve={({ data }) => {
          console.log(data);
        }}
        onReject={(err) => console.log(err)}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </>
  );
};

export default SocialLogin;
