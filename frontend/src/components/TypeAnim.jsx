import {TypeAnimation} from "react-type-animation";

export default function TypeAnim() {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Where Conversations Come Alive 🌟',    //🌟
        1500,
        'Where Conversations Meet Innovation',   //🚀
        1500,
        'Where Conversations Transform',  //✨
        1500
      ]}
      wrapper="span"
      speed={50}
      style={{display: 'inline-block', /*border: "1px solid white"*/ }}
      repeat={Infinity}
    />
  );
}