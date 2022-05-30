import React, { useEffect, useState } from "react";
import "../chatBox/chat.css";

export default function Chatwrappe(props) {
  const [text, setText] = useState();
  const [data, setData] = useState();
  const texts = props.messages;

  function text_faSliders(texts) {
    const box = [];
    for (let i = 0; i < texts.length; i++) {
      texts[i].from == "other"
        ? box.push(
            <div key={i} className="other">
              <div>{texts[i].message}</div>
            </div>
          )
        : box.push(
            <div key={i} className="me">
              <div>{texts[i].message}</div>
            </div>
          );
    }
    setData(box);
  }
  useEffect(() => {
    text_faSliders(texts);
  }, [props.messages]);

  return (
    <>
      <div className="username">
        <b>{props.username}</b>
      </div>
      <div className="text-container">{data}</div>
      <div className="input">
        <form onSubmit={props.handleSubmit}>
          <input
            className="text"
            type={"text"}
            value={text}
            onChange={() => {
              setText("567");
            }}
          />
          <input className="send" type={"submit"} value={"send"} />
        </form>
      </div>
    </>
  );
}
