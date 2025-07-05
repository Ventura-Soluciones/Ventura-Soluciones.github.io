sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox", "sap/ui/model/json/JSONModel"],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (Controller, MessageToast, MessageBox, JSONModel) {
  "use strict";

  // Definir interfaces para seguridad de tipos
  return Controller.extend("finanb1.controller.Login", {
    oCurrentUser: null,
    onInit: function () {
      const oLoginModel = new JSONModel({
        username: "",
        password: "",
        rememberMe: false
      });
      this.getView().setModel(oLoginModel, "loginModel");
    },
    onLoginPress: function () {
      const oModel = this.getView().getModel("loginModel");
      const sUsername = oModel.getProperty("/username");
      const sPassword = oModel.getProperty("/password");
      const bRememberMe = oModel.getProperty("/rememberMe");

      // Basic validation
      if (!sUsername || !sPassword) {
        MessageBox.error("Por favor ingrese usuario y contraseña");
        return;
      }

      // Show loading indicator
      const loginButton = this.byId("loginButton");
      if (loginButton) {
        loginButton.setEnabled(false);
        loginButton.setText("Verificando...");
      }

      // Authenticate user asynchronously
      this.authenticateUser(sUsername, sPassword).then(authenticated => {
        if (authenticated) {
          this.setAuthenticationState(true, sUsername, bRememberMe);
          MessageToast.show("Inicio de sesión exitoso", {
            duration: 2000
          });
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteConfiguracion");
        } else {
          MessageBox.error("Usuario o contraseña incorrectos");
        }
      }).catch(error => {
        console.error("Authentication error:", error);
        MessageBox.error("Error durante la autenticación. Por favor intente nuevamente.");
      }).finally(() => {
        // Reset button state
        if (loginButton) {
          loginButton.setEnabled(true);
          loginButton.setText("Iniciar Sesión");
        }
      });
    },
    authenticateUser: function (sUsername, sPassword) {
      return new Promise((resolve, reject) => {
        // Get mock users data
        const aUserAccess = new JSONModel();
        try {
          // Load data synchronously first
          aUserAccess.loadData("./model/mock/users.json", undefined, false);

          // Try to get data immediately
          const data = aUserAccess.getData();
          if (data && data.users) {
            const aUsers = data.users;

            // Find user with matching credentials (using email as username)
            const oUser = aUsers.find(function (user) {
              return user.email === sUsername && user.password === sPassword;
            });
            if (oUser) {
              // Store user info for later use
              this.oCurrentUser = oUser;
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            // Fallback to hardcoded users
            this.useFallbackUsers(sUsername, sPassword, resolve);
          }
        } catch (error) {
          console.error("Error loading user data:", error);
          // Fallback to hardcoded users for testing
          this.useFallbackUsers(sUsername, sPassword, resolve);
        }
      });
    },
    useFallbackUsers: function (sUsername, sPassword, resolve) {
      const fallbackUsers = [{
        id: 1,
        name: "Admin User",
        email: "admin@company.com",
        password: "admin123",
        role: "admin",
        status: "active",
        companies: [{
          id: 1,
          name: "Demo Company"
        }]
      }, {
        id: 2,
        name: "Regular User",
        email: "user@company.com",
        password: "user123",
        role: "user",
        status: "active",
        companies: [{
          id: 1,
          name: "Demo Company"
        }]
      }];
      const oUser = fallbackUsers.find(function (user) {
        return user.email === sUsername && user.password === sPassword;
      });
      if (oUser) {
        this.oCurrentUser = oUser;
        resolve(true);
      } else {
        resolve(false);
      }
    },
    setAuthenticationState: function (bAuthenticated, sUsername, bRememberMe) {
      const oAuthData = {
        isAuthenticated: bAuthenticated,
        userInfo: this.oCurrentUser || {},
        timestamp: Date.now()
      };
      if (bRememberMe) {
        localStorage.setItem("finanb1_auth", JSON.stringify(oAuthData));
      } else {
        sessionStorage.setItem("finanb1_auth", JSON.stringify(oAuthData));
      }
    },
    onForgotPassword: function () {
      MessageBox.information("Función de recuperación de contraseña en desarrollo");
    },
    onKeyPress: function (oEvent) {
      // Handle Enter key press to trigger login
      if (oEvent.getParameter("keyCode") === 13) {
        // Enter key
        this.onLoginPress();
      }
    },
    getAuthenticationState: function () {
      // Check both session and local storage
      const sAuthData = sessionStorage.getItem("finanb1_auth") || localStorage.getItem("finanb1_auth");
      return sAuthData ? JSON.parse(sAuthData) : null;
    }
  });
});
//# sourceMappingURL=Login-dbg.controller.js.map
