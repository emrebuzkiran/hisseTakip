"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

const isLogged = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    useEffect(() => {
      let rawToken = document.cookie;
      let token = rawToken.substring("jwt=".length);

      if (!token) {
        router.push("/auth/login");
      } else {
        axios
          .post("http://localhost:8080/api/auth/test", { token })
          .then((response) => {
            // Oturum geçerliyse, işlem devam edebilir
          })
          .catch((error) => {
            router.push("/auth/login");
          });
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default isLogged;