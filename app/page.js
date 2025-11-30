import Navbar from "./Navbar/Navbar";
import Section1 from "./Section1/Section1";
import Video from "./Video/Video";
import Footer from "./Footer/Footer";

export default function Home() {
  return (
    <>
    <head>
      <title>Home Page</title>
      <meta name="description" content="Welcome to our home page!" />
    </head>
    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <Video />
    <Navbar />
    <Section1 />
    <Footer />
    </>
  );
}
