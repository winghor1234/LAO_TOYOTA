// import { ToastContainer } from 'react-toastify';
// import Router from './route/Router';
// import { useEffect } from 'react';
// import useToyotaStore from './store/ToyotaStore';

// const App = () => {
//   useEffect(() => {
//     const checkAndRefreshToken = async () => {
//       const newToken = await useToyotaStore.getState().refreshTokenIfNeeded();

//       // ถ้า refresh ไม่สำเร็จ token จะถูกลบอัตโนมัติ
//       if (!newToken) {
//         console.log("Token หมดอายุและไม่สามารถ refresh ได้");
//       } else {
//         console.log("Token refreshed:", newToken);
//       }
//     };

//     checkAndRefreshToken();
//   }, []);

//   return (
//     <div>
//       <ToastContainer />
//       <Router />
//     </div>
//   );
// };

// export default App;

import { ToastContainer } from 'react-toastify'
import Router from './route/Router'
import { useEffect } from 'react';
import useToyotaStore from './store/ToyotaStore';


const App = () => {
  useEffect(() => {
    const checkTokenValidate = () => {
      const tokenExpire = useToyotaStore.getState().getTokenExpire();
      const now = Date.now();

      if (tokenExpire && now > tokenExpire) {
        useToyotaStore.getState().removeToken();
      }
    };

    checkTokenValidate();
  }, []);

  return (
    <div>
      <ToastContainer/>
      <Router/>
    </div>
  )
}

export default App