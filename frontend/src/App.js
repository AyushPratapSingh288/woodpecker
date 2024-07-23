import "./App.css";
import Login from "./Login";  
// import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import Home from "./Home";

function App() {
  const api_key = "np46b29cpcrn";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <Home />
          <button  className="logbtn"onClick={logOut}> Log Out</button>
        </Chat>
      ) : (
        <> 
        <div className="cont">
           <div className="center"><div className="tital"><h1>Tic-Tac-Toe</h1>  </div></div>
           <div className="log">
           {/* <SignUp setIsAuth={setIsAuth} /> */}
           <Login setIsAuth={setIsAuth} />
           </div>
           </div>
           <div className="svg">
      
    </div>
        </>
     )}
   </div>
  );
}

export default App;

