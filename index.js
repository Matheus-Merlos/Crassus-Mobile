import { registerRootComponent } from "expo";

import App from "./App";
import { Provider } from "jotai";
import { Provider as PaperProvider } from "react-native-paper";

function Root() {
  return (
    <Provider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
