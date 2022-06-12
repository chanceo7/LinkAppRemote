z;
import axios from "axios";

function Forward(props) {
  const [input, setInput] = useState("");
  const [contact, setContact] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (data == "") {
      return setContact([]);
    }
    axios
      .post("http://localhost:8080/api/search/contact", { search: value })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setContact(res.data);
        }
      });
  };

  return (
    <div>
      <div className="forward">
        <div className="forward-container">
          <div className="Forward-search">
            <span className="forward-to">To:</span>
            <div className="forward">
              <div className="forward-results">
                {contact.map((item, index) => {
                  return (
                    <div className="forward-conv-box">
                      <div className="conv-box">
                        {" "}
                        <img src="https://th.bing.com/th/id/R.12ffda7772726f505cc8f029a098ea0b?rik=%2bSlOC02qhlZC1Q&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f22300000%2fKakashi-kakashi-22321330-1280-720.jpg&ehk=%2bIH2jrKOIAAle6M6Ht142Q1uCSqU31KEB7SW096%2fAXA%3d&risl=&pid=ImgRaw&r=0" />{" "}
                        <span>{item.first_name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <input
                type={"text"}
                value={input}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="forward-conversation">
            {props.conversation.map((item, index) => {
              return (
                <div className="forward-conv-box">
                  <div className="conv-box">
                    {" "}
                    <img src="https://yt3.ggpht.com/a/AATXAJxYH2CWooAZZJxXXo_3QT15b4lSpfDWDmh6Bg=s900-c-k-c0xffffffff-no-rj-mo" />{" "}
                    <span>{item.first_name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forward;
