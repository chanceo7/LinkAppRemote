import React, { useState, useEffect } from "react";

export default function Conversation({ item }) {
  const notification = item.notification;
  const [num, setNum] = useState(0);
  const reset = () => {
    setNum(0);
  };

  const set = (num) => {
    setNum(num);
  };

  useEffect(() => {
    set(notification);
    console.log("item :", item);
  }, [item]);

  return (
    <div className="conversation" onClick={reset}>
      <img
        className="pro-img"
        src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/08/Featured-Hated-Loved-Sasuke-Uchiha.jpg?q=50&fit=crop&w=1600&dpr=1.5"
        alt="pro-img"
      />
      <p>{item.first_name}</p>
      <div className="notification">
        {num > 0 && (
          <div id={notification == 0 ? "transp" : ""}>{notification}</div>
        )}
      </div>
    </div>
  );
}
