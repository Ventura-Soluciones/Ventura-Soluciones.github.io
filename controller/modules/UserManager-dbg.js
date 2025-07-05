sap.ui.define([], function () {
  "use strict";

  /**
   * UserManager - Handles user authentication and management
   */
  class UserManager {
    constructor() {
      this.oCurrentUser = null;
    }
    loadAuthenticatedUser() {
      // Obtener datos de autenticación del almacenamiento
      const authData = sessionStorage.getItem("finanb1_auth") || localStorage.getItem("finanb1_auth");
      if (authData) {
        try {
          const parsedAuthData = JSON.parse(authData);
          if (parsedAuthData.isAuthenticated && parsedAuthData.userInfo) {
            this.oCurrentUser = parsedAuthData.userInfo;
            console.log("Usuario autenticado cargado:", this.oCurrentUser);
          } else {
            this.setDefaultUser();
          }
        } catch (error) {
          console.error("Error parsing auth data:", error);
          this.setDefaultUser();
        }
      } else {
        this.setDefaultUser();
      }
      return this.oCurrentUser;
    }
    setDefaultUser() {
      // Establecer usuario por defecto si no hay datos de autenticación
      this.oCurrentUser = {
        id: 1,
        name: "Demo User",
        email: "demo@company.com",
        role: "admin",
        status: "active",
        companies: [{
          id: 1,
          name: "Demo Company"
        }]
      };
      console.log("Usando usuario por defecto:", this.oCurrentUser);
    }
    getCurrentUser() {
      return this.oCurrentUser;
    }
    checkAuthentication() {
      const sAuthData = sessionStorage.getItem("com.vs.extension.finanb1_auth") || localStorage.getItem("com.vs.extension.finanb1_auth");
      if (!sAuthData) return false;
      const oAuthData = JSON.parse(sAuthData);
      return oAuthData && oAuthData.isAuthenticated;
    }
    logout() {
      sessionStorage.removeItem("finanb1_auth");
      localStorage.removeItem("finanb1_auth");
      this.oCurrentUser = null;
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.UserManager = UserManager;
  return __exports;
});
//# sourceMappingURL=UserManager-dbg.js.map
