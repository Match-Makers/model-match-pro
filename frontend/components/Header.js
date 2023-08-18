import {Navbar as BootstrapHeader} from "reactstrap";

export default function Header(props) {
  return (
  <BootstrapHeader>
    <h1>Model Match Pro</h1>
   {props.children}
  </BootstrapHeader>
  )
}