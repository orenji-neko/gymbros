import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './hooks/api/useAuth';

import TrainerLayout from './layouts/TrainerLayout';

import MemberLayout from './layouts/MemberLayout';
import MemberPrograms from "./pages/member/MemberPrograms";
import MemberBookings from './pages/member/MemberBookings';

import TrainerPrograms from './pages/trainer/TrainerPrograms';
import TrainerEquipment from "./pages/trainer/TrainerEquipment";
import TrainerBookings from './pages/trainer/TrainerBookings';
import Login from './pages/Login';

const App = () => {

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route index element={<Login/>} />

        {/* Member */}
        <Route path="member" element={<MemberLayout/>}>
          {/* Programs */}
          <Route index element={<MemberPrograms/>} />
          {/* Bookings */}
          <Route path="bookings" element={<MemberBookings/>} />
        </Route>

        {/* Trainer */}
        <Route path="trainer" element={<TrainerLayout/>}>
          {/* Programs */}
          <Route index element={<TrainerPrograms/>} />
          {/* Equipment */}
          <Route path="equipment" element={<TrainerEquipment/>} />
          {/* Bookings */}
          <Route path="bookings" element={<TrainerBookings/>} />
        </Route>

      </Routes>
    </Router>
    </AuthProvider>
  ) 
}

export default App;