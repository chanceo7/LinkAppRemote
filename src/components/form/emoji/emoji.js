import React from "react";
import "../emoji/emoji.css";

function Emoji(props) {
  const mostPopular = [
    "โค๏ธ",
    "๐",
    "๐คฃ",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐ญ",
    "๐",
  ];
  const faces_Emotion = [
    "๐",
    "๐",
    "๐",
    "๐คฃ",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐ฅฐ",
    "๐",
    "๐ฅฒ",
    "๐",
    "โบ๏ธ",
    "๐",
    "๐ค",
    "๐คฉ",
    "๐ค",
    "๐คจ",
    "๐",
    "๐",
    "๐ถ",
    "๐ถโ๐ซ๏ธ",
    "๐",
    "๐",
    "๐ฃ",
    "๐ฅ",
    "๐ฎ",
    "๐ค",
    "๐ฏ",
    "๐ช",
    "๐ซ",
    "๐ฅฑ",
    "๐ด",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐คค",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐ค",
    "๐ฒ",
    "โน๏ธ",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐ค",
    "๐ข",
    "๐ง",
    "๐จ",
    "๐ฎโ๐จ",
    "๐ฉ",
    "๐คฏ",
    "๐ฌ",
    "๐ฐ",
    "๐ฑ",
    "๐ฅต",
    "๐ฅถ",
    "๐ณ",
    "๐คช",
    "๐ต",
    "๐ตโ๐ซ",
    "๐ฅด",
    "๐ ",
    "๐ก",
    "๐คฌ",
    "๐ท",
    "๐ค",
    "๐ค",
    "๐คข",
    "๐คฎ",
    "๐",
    "๐ฅณ",
    "๐ฅธ",
    "๐ฅบ",
    "๐ค ",
    "๐คก",
    "๐คฅ",
    "๐คซ",
    "๐คญ",
    "๐ง",
    "๐ค",
    "๐",
    "๐ฟ",
    "๐น",
    "๐บ",
    "๐",
    "โ ๏ธ",
    "๐ป",
    "๐ฝ",
    "๐พ",
    "๐ค",
    "๐ฉ",
  ];

  const hands = [];
  const activity = [];
  const symboles = [];
  const object = [];
  const peoples = [];
  const travel = [];
  const animals = [
    "๐",
    "๐",
    "๐",
    "๐ต",
    "๐ถ",
    "๐บ",
    "๐ฑ",
    "๐ฆ",
    "๐ฏ",
    "๐ฆ",
    "๐ฆ",
    "๐ฆ",
    "๐ฎ",
    "๐ท",
    "๐",
    "๐ญ",
    "๐น",
    "๐ฐ",
    "๐ป",
    "๐ปโโ๏ธ",
    "๐จ",
    "๐ผ",
    "๐ธ",
    "๐ฆ",
    "๐ด",
    "๐ฆ",
    "๐",
    "๐ฒ",
    "๐ฝ",
    "๐พ",
    "๐",
    "๐ฆ",
    "๐ฆง",
    "๐ฆฎ",
    "๐โ๐ฆบ",
    "๐ฉ",
    "๐",
    "๐",
    "๐โโฌ",
    "๐",
    "๐",
    "๐",
    "๐ฆ",
    "๐ฆฌ",
    "๐ฆ",
    "๐",
    "๐ฆ",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐ช",
    "๐ซ",
    "๐ฆ",
    "๐ฆ",
    "๐ฆฅ",
    "๐ฆจ",
    "๐ฆก",
    "๐ฆฃ",
    "๐",
    "๐",
    "๐ฆ",
    "๐",
    "๐ฟ๏ธ",
    "๐ฆซ",
    "๐ฆ",
    "๐",
    "๐ข",
    "๐",
    "๐",
    "๐ฆ",
    "๐ฆ",
    "๐ฆฆ",
    "๐ฆ",
    "๐ฌ",
    "๐ฆญ",
    "๐ณ",
    "๐",
    "๐",
    "๐ ",
    "๐ก",
    "๐ฆ",
    "๐ฆ",
    "๐",
    "๐ฆ",
    "๐",
    "๐ฆ",
    "๐",
    "๐ฆ",
    "๐ฆ",
    "๐ฆข",
    "๐ฆ",
    "๐ฆฉ",
    "๐ฆ",
    "๐ฆ",
    "๐ฆค",
    "๐ชถ",
    "๐ฆ",
    "๐ง",
    "๐ฅ",
    "๐ค",
    "๐ฃ",
    "๐ฆ",
    "๐ฆ",
    "๐",
    "๐ฆ",
    "๐ชฐ",
    "๐ชฑ",
    "๐ฆ",
    "๐",
    "๐ชณ",
    "๐",
    "๐ชฒ",
    "๐",
    "๐ฆ",
    "๐ท๏ธ",
    "๐ธ๏ธ",
  ];

  const insertEmoji = (emoji, index) => {
    props.insert(emoji);
  };

  const hide = () => {
    document.querySelector(".emoji-container").style.visibility = "hidden";
  };

  return (
    <div className="emoji-container">
      <div className="emoji-overlay" onClick={() => hide()}></div>
      <h2 className={"title"}>Most popular</h2>
      {mostPopular.map((item, index) => {
        return (
          <span
            onClick={() => insertEmoji(item, index)}
            className="emoji"
            key={index + "a"}
          >
            {item}
          </span>
        );
      })}
      <h2 className={"title"}>Face emoji</h2>
      {faces_Emotion.map((item, index) => {
        return (
          <span
            onClick={() => insertEmoji(item, index)}
            className="emoji"
            key={index + "b"}
          >
            {item}
          </span>
        );
      })}
      <h2 className={"title"}>Hands</h2>
      {hands.map((item, index) => {
        return (
          <span
            onClick={() => insertEmoji(item, index)}
            className="emoji"
            key={index + "e"}
          >
            {item}
          </span>
        );
      })}
      <h2 className={"title"}>Peoples</h2>
      {peoples.map((item, index) => {
        return (
          <span
            onClick={() => insertEmoji(item, index)}
            className="emoji"
            key={index + "d"}
          >
            {item}
          </span>
        );
      })}
      <h2 className={"title"}>Animals</h2>
      {animals.map((item, index) => {
        return (
          <span
            onClick={() => insertEmoji(item, index)}
            className="emoji"
            key={index + "c"}
          >
            {item}
          </span>
        );
      })}
      <h2 className={"title"}>Activities</h2>
      {activity.map((item, index) => {
        return (
          <span
            onClick={() => insertEmoji(item, index)}
            className="emoji"
            key={index + "f"}
          >
            {item}
          </span>
        );
      })}
      <h2 className={"title"}>Travel</h2>
      {travel.map((item, index) => {
        return (
          <span
            onClick={() => insertEmoji(item, index)}
            className="emoji"
            key={index + "f"}
          >
            {item}
          </span>
        );
      })}
      <h2 className={"title"}>Ojects</h2>
      {object.map((item, index) => {
        return (
          <span
            onClick={() => insertEmoji(item, index)}
            className="emoji"
            key={index + "g"}
          >
            {item}
          </span>
        );
      })}
      <h2 className={"title"}>Symboles</h2>
      {symboles.map((item, index) => {
        return (
          <span
            onClick={() => insertEmoji(item, index)}
            className="emoji"
            key={index + "h"}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}

export default Emoji;
