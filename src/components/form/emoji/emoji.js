import React from "react";
import "../emoji/emoji.css";

function Emoji(props) {
  const mostPopular = [
    "❤️",
    "😂",
    "🤣",
    "👍",
    "🙌",
    "😒",
    "😍",
    "😘",
    "👌",
    "💕",
    "😊",
    "🎉",
    "😭",
    "💔",
  ];
  const faces_Emotion = [
    "😀",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😅",
    "😆",
    "😉",
    "😊",
    "😋",
    "😎",
    "😘",
    "🥰",
    "😙",
    "🥲",
    "😚",
    "☺️",
    "🙂",
    "🤗",
    "🤩",
    "🤔",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😶‍🌫️",
    "🙄",
    "😏",
    "😣",
    "😥",
    "😮",
    "🤐",
    "😯",
    "😪",
    "😫",
    "🥱",
    "😴",
    "😌",
    "😛",
    "😜",
    "😝",
    "🤤",
    "😒",
    "😓",
    "😔",
    "😕",
    "🙃",
    "🤑",
    "😲",
    "☹️",
    "🙁",
    "😖",
    "😞",
    "😟",
    "😤",
    "😢",
    "😧",
    "😨",
    "😮‍💨",
    "😩",
    "🤯",
    "😬",
    "😰",
    "😱",
    "🥵",
    "🥶",
    "😳",
    "🤪",
    "😵",
    "😵‍💫",
    "🥴",
    "😠",
    "😡",
    "🤬",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "😇",
    "🥳",
    "🥸",
    "🥺",
    "🤠",
    "🤡",
    "🤥",
    "🤫",
    "🤭",
    "🧐",
    "🤓",
    "😈",
    "👿",
    "👹",
    "👺",
    "💀",
    "☠️",
    "👻",
    "👽",
    "👾",
    "🤖",
    "💩",
  ];

  const hands = [];
  const activity = [];
  const symboles = [];
  const object = [];
  const peoples = [];
  const travel = [];
  const animals = [
    "🙈",
    "🙉",
    "🙊",
    "🐵",
    "🐶",
    "🐺",
    "🐱",
    "🦁",
    "🐯",
    "🦒",
    "🦊",
    "🦝",
    "🐮",
    "🐷",
    "🐗",
    "🐭",
    "🐹",
    "🐰",
    "🐻",
    "🐻‍❄️",
    "🐨",
    "🐼",
    "🐸",
    "🦓",
    "🐴",
    "🦄",
    "🐔",
    "🐲",
    "🐽",
    "🐾",
    "🐒",
    "🦍",
    "🦧",
    "🦮",
    "🐕‍🦺",
    "🐩",
    "🐕",
    "🐈",
    "🐈‍⬛",
    "🐅",
    "🐆",
    "🐎",
    "🦌",
    "🦬",
    "🦏",
    "🐘",
    "🦛",
    "🐂",
    "🐃",
    "🐄",
    "🐖",
    "🐏",
    "🐑",
    "🐐",
    "🐪",
    "🐫",
    "🦘",
    "🦙",
    "🦥",
    "🦨",
    "🦡",
    "🦣",
    "🐁",
    "🐀",
    "🦔",
    "🐇",
    "🐿️",
    "🦫",
    "🦎",
    "🐊",
    "🐢",
    "🐍",
    "🐉",
    "🦕",
    "🦖",
    "🦦",
    "🦈",
    "🐬",
    "🦭",
    "🐳",
    "🐋",
    "🐟",
    "🐠",
    "🐡",
    "🦐",
    "🦑",
    "🐙",
    "🦞",
    "🐚",
    "🦆",
    "🐓",
    "🦃",
    "🦅",
    "🦢",
    "🦜",
    "🦩",
    "🦚",
    "🦉",
    "🦤",
    "🪶",
    "🐦",
    "🐧",
    "🐥",
    "🐤",
    "🐣",
    "🦇",
    "🦋",
    "🐌",
    "🦟",
    "🪰",
    "🪱",
    "🦗",
    "🐜",
    "🪳",
    "🐝",
    "🪲",
    "🐞",
    "🦂",
    "🕷️",
    "🕸️",
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
