import Register from './components/Register';
import Login from './components/Login';
import User from './page/userPage/User';
import Layout from './components/Layout';
import Admin from './page/adminPage/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import UserInfo from './page/userPage/UserInfo';
import Home from './page/Home';
import LinkPage from './page/LinkPage';
import SwitchRole from './page/SwitchRole';
import PublicImage from './page/adminPage/PublicImage';
import Uploader from './components/Uploader';
import ImageTable from './page/adminPage/ImageTable';

const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  FIRST: 'ROLE_FIRST',
  USER: 'ROLE_USER'
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/main" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.FIRST]} />}>
          <Route path='link' element={<LinkPage />} />
          <Route path='security/swith_role' element={<SwitchRole />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.FIRST]} />}>
          <Route path="main-u" element={<User />} />
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="upload-p" element={<Uploader />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="main-a" element={<Admin />} />
          <Route path="public-image" element={<PublicImage />} />
          <Route path="image-table" element={<ImageTable />} />
          <Route path="upload" element={<Uploader />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;