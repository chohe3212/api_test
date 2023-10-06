import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password) => {
    const baseUrl = "https://api.mandarin.weniv.co.kr";
    const reqPath = "/user/login";
    const reqUrl = baseUrl + reqPath;

    const loginData = {
      user: {
        email: email,
        password: password,
      },
    };
    try {
      // 로그인 요청을 해준다.
      // fetch는 기본값이 get이기에 post일 경우 메소드를 명시해야함.
      // fetch에서 post로 요청을 해야함.
      const res = await fetch(reqUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const json = await res.json();
      console.log(json);

      const token = json.user.token;
      console.log(token);
      // 로컬스토리지에 토큰 저장하기.
      localStorage.setItem("token", token);
    } catch (error) {
      alert("로그인에 실패했습니다!");
    }
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      <h1>로그인</h1>
      <section>
        <h2>이메일, 비밀번호 입력하는 곳</h2>
        <form onSubmit={submitLogin}>
          <input
            type="text"
            placeholder="이메일 입력"
            value={email}
            onChange={inputEmail}
          />
          <input
            type="text"
            placeholder="비밀번호 입력"
            value={password}
            onChange={inputPassword}
          />
          <button>로그인</button>
        </form>
      </section>
    </>
  );
}
