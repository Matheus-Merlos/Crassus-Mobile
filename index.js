import { registerRootComponent } from "expo";

import App from "./App";
import { Provider } from "react-redux";
import { loginStore, loginPersistor } from "./src/redux/stores";
import { PersistGate } from "redux-persist/integration/react";

function Root() {
  return (
    <Provider store={loginStore}>
      <PersistGate loading={null} persistor={loginPersistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
