import { Container, Nav, Navbar } from "react-bootstrap"
import social1 from "../assets/img/email.png"
import social2 from "../assets/img/insta.png"
import social3 from "../assets/img/whatsapp.png"
import social4 from "../assets/img/website.png"
import logo from '../assets/img/logo.png';

const NavBar = () => {
    return (
        <Navbar>
        <div className = "logo">
            <img src = {logo} alt = "logo"></img>
          </div>
            <Container>
                <p></p>
                  {/* Social Icons */}
                  <span className="navbar-text">
                    <div className="social-icon">
                        <a href="mailto:baking-society@imperial.ac.uk">
                            <img src={social1} alt="email"/>
                        </a>
                        <a href="https://www.instagram.com/icbakingsoc/?hl=en-gb">
                            <img src={social2} alt="insta"/>
                        </a>
                        <a href="https://chat.whatsapp.com/C2Vpor3H2ix7o6BLWBuuPX">
                            <img src={social3} alt="whatsapp"/>
                        </a>
                        <a href="https://www.imperialcollegeunion.org/activities/a-to-z/baking">
                            <img src={social4} alt="membership"/>
                        </a>
                    </div>
                  </span>
            </Container>
        </Navbar>
    )
}
export default NavBar;