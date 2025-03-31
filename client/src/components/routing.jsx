import { Route, Routes } from "react-router-dom"
import { HelpRequests } from "./Helprequests"
import { MyNav } from "./mynav"
import { Details } from "./details"
import { Home } from "./myHome"
import { RegisterVolunteer } from "./RegisterVolunteer"
import { NewVolunteer } from "./newVolunteer"
import { SeeTheRequest } from "./SeeTheRequest"
import { PrivateArea } from "./PrivateArea"
import { Thanks } from "./Thanks"
import GenimiChat from "./GenimiChat"
export const Routing = () => {
    return <div>
        <Routes>
            <Route path={'/'} element={<Home></Home>}></Route>
            <Route path={'/helpRequests'} element={<HelpRequests></HelpRequests>}> </Route>
            <Route path={'myMyNav'} element={<MyNav></MyNav>}></Route>
            <Route path={'/helprequest/:id'} element={<Details></Details>}></Route>
            <Route path={'myHome'} element={<Home></Home>}></Route>
            <Route path={'registerVolunteer/:id'} element={<RegisterVolunteer></RegisterVolunteer>}></Route>
            <Route path={'newVolunteer'} element={<NewVolunteer></NewVolunteer>}></Route>
            <Route path={'SeeTheRequest'} element={<SeeTheRequest></SeeTheRequest>}></Route>
            <Route path={'privateArea'} element={<PrivateArea></PrivateArea>}></Route>
            <Route path={'thanks'} element={<Thanks></Thanks>}></Route>
            <Route path={'chat'} element={<GenimiChat></GenimiChat>}></Route>
        </Routes>
    </div>
}