// local
import "./header.css";

// react router
import { NavLink } from "react-router";

function Header() {
    return (
        <header>
            <h1>Timer StopWatch App</h1>
            <p>Simple timer stopwatch app built with React</p>
            <nav aria-label="Main Navigation">
                <ul>
                    <li>
                        <button type="button" title="Stopwatch" role="navigation">
                            <NavLink to="/stopwatch">Stopwatch</NavLink>
                        </button>
                    </li>
                    <li>
                        <button type="button" title="Timer" role="navigation">
                            <NavLink to="/timer">Timer</NavLink>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
