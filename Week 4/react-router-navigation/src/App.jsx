// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { lazy } from "react";
// // import Navigation from "./components/Navigation";
// // import Home from './pages/Home';
// // import About from './pages/About';
// // import Contact from './pages/Contact';

// const Navigation = lazy(() => import('./components/Navigation'))
// const Home = lazy(() => import('./pages/Home'))
// const About = lazy(() => import('./pages/About'))
// const Contact = lazy(() => import('./pages/Contact'))
// const UserProfile = lazy(() => import('./pages/UserProfile'))
// const QueryString = lazy(() => import('./pages/QueryString'))

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Navigation />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route
//             path="/UserProfile/:id"
//             element={<UserProfile />}
//           />
//           <Route
//             path="/query"
//             element={<QueryString />}
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

// import ContactForm from "./components/ContactForm";
// import InteractiveButton from "./components/InteractiveButton";
// import KeyboardDemo from "./components/KeyboardDemo";
// import DynamicList from "./components/DynamicList";
// import ImageGallery from "./components/ImageGallery";

// function App() {
//   return (
//     <div>
//       <h1>React Event Handling</h1>
//       <h3>Interactive Button Components</h3>
//       <InteractiveButton />
//       <KeyboardDemo />
//       <h3>Form Handling with Validation</h3>
//       <ContactForm />
//       <h3>Event Delegation and Dynamic List</h3>
//       <DynamicList />
//       <h3>Image Gallery</h3>
//       <ImageGallery />
//     </div>
//   );
// }

// export default App;

import Dashboard from "./components/Dashboard";
import ProductCatalog from "./components/ProductCatalog";

function App() {
  return (
    <div>
      <Dashboard />
      <ProductCatalog/>
    </div>
  );
}

export default App;