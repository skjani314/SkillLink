import Logreg from "./components/Logreg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPass from "./components/ResetPass";

const App = () =>
{

return(

<BrowserRouter>
<Routes>

<Route path="/login" element={<Logreg/>} />
<Route path="/verify/:token" element={<ResetPass/>} />

</Routes>
</BrowserRouter>

);
} 
export default App;