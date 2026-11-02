// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

// function App(){
//   return(
//     <div>
//       <p>Suzilana Mo</p>
//     </div>
//   )
// }

// export default App;


// import PersonalInfo from "./components/PersonalInfo";

// function App(){
//   return(
//     <div>
//       <PersonalInfo/>
//     </div>
//   )
// }

// export default App;


// import UserCard from "./components/UserCard";

// function App() {
//   const users = [
//     {
//       name: "Selena Gomez",
//       email: "selena@gmail.com",
//       role: "Software Engineer"
//     },
//     {
//       name: "Jude Bellingham",
//       email: "jude@gmail.com",
//       role: "Frontend Developer"
//     },
//     {
//       name: "Sophia Rodrigo",
//       email: "sophia@gmail.com",
//       role: "UI/UX Designer"
//     }
//   ];

//   return (
//     <div>
//       {users.map((user, index) => (
//         <UserCard
//           key={index}
//           name={user.name}
//           email={user.email}
//           role={user.role}
//         />
//       ))}
//     </div>
//   );
// }

// export default App;

// import ProductCard from "./components/ProductCard";

// function App() {
//   const product = {
//     image: "https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Primary_image_Sand-pink?$primaryshotPreset$&fmt=png-alpha",
//     name: "Sony WH-1000XM6",
//     price: 2099.90,
//     description: "BEYOND QUIET, TRANSCENDENT SOUND: The best noise cancelling"
//   };

//   return (
//     <div>
//       <h1>My Products</h1>

//       <ProductCard product={product} />
//     </div>
//   );
// }

// export default App;

// import UserCard from "./components/UserCard";

// function App() {
//   return (
//     <div>
//         <UserCard/>
//     </div>
//   );
// }

// export default App;

import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ProductList />
    </div>
  );
}

export default App;