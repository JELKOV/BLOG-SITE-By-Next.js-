import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/jelkov.jpg"
          alt="An image showing Jelkov"
          width={300}
          height={300}
          priority
        />
      </div>
      <h1>Hi, I'm Jelkov</h1>
      <p>I blog about web development - Next.js</p>
    </section>
  );
}

export default Hero;
