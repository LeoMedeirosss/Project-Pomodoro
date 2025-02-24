import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/home"
import { History } from "./pages/History"

export function Router() {
    return(
        <Routes>
            <Route path="/" element={<Home />}/> // Home
            <Route path="/history" element={<History />}/> // History
        </Routes> 
    )
}
