import Link from "next/link";
import classes from "./main-navigation.module.css";
import Logo from "./logo";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/" legacyBehavior>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts" legacyBehavior>
              <a>Posts</a>
            </Link>
          </li>
          <li>
            <Link href="/contact" legacyBehavior>
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
