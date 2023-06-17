import { Fragment } from "react"
import Navigation from "../components/Navigation"
import BotonesPerfil from "../components/BotonesPerfil";

export default function Layout({ children }){
  return (
    <Fragment>
      <Navigation />
      <BotonesPerfil/>
      {children}
    </Fragment>
  );
}