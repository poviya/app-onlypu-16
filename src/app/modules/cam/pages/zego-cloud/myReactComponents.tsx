// import * as React from "react"; 

// const MyReactComponent = () => {
//     const [text, setText] = React.useState('First Text');
//     const [roomCode, setRoomCode] = React.useState('');
//     const onClick = () => {
//         setText('Button click');
//     }

//     const handleFormSubmit = (ev: any) => {
//         ev.preventDefault();

//     }

//     return (
//         <div className="home-page">
//             {/* {text}
//             <br />
//             <button onClick={onClick}>
//                 ChangeText
//             </button> */}

//             <form className="form" onSubmit={handleFormSubmit}>
//                 <div>
//                     <label htmlFor="">Enter Room Code</label>
//                     <input type='text' required placeholder="Enter Roon Code" onChange={e => setRoomCode(e.target.value)} value={roomCode}></input>
//                 </div>
//                 <button type="submit">Enter Room</button>
//             </form>
//         </div>
//     )
// }

// export default MyReactComponent;

import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len: any) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  let myMeeting = async (element: any) => {

 // generate Kit Token
 const appID = 864427711;
 const serverSecret = "258ad912dc29278008e71d8b2cd94efc";
 const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));

 // Create instance object from Kit Token.
 const zp: any = ZegoUIKitPrebuilt.create(kitToken);
 // start the call
 zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
          window.location.protocol + '//' + 
          window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
      mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}