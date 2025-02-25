import {Timer, Scroll, Triangle} from "phosphor-react"
import { HeaderConteiner } from "./styles";
import { NavLink } from "react-router-dom";

export function Header() {
    return(
        <HeaderConteiner>
            <div>
                <Triangle size={30}/>
            </div>
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24}/>
                </NavLink>
                <NavLink to="/history" title="Historico">
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderConteiner>
    )
}