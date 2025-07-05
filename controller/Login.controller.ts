sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        Controller: any,
        MessageToast: any,
        MessageBox: any,
        JSONModel: any
    ) {
        "use strict";

        // Definir interfaces para seguridad de tipos
        interface User {
            id: number;
            name: string;
            email: string;
            password: string;
            role: string;
            status: string;
            companies: Array<{ id: number; name: string }>;
        }

        interface AuthData {
            isAuthenticated: boolean;
            userInfo: User;
            timestamp: number;
        }

        interface LoginModel {
            username: string;
            password: string;
            rememberMe: boolean;
        }

        return Controller.extend("finanb1.controller.Login", {
            oCurrentUser: null as User | null,

            onInit: function (this: any): void {
                const oLoginModel: any = new JSONModel({
                    username: "",
                    password: "",
                    rememberMe: false
                } as LoginModel);
                this.getView().setModel(oLoginModel, "loginModel");
            },

            onLoginPress: function (this: any): void {
                const oModel: any = this.getView().getModel("loginModel");
                const sUsername: string = oModel.getProperty("/username");
                const sPassword: string = oModel.getProperty("/password");
                const bRememberMe: boolean = oModel.getProperty("/rememberMe");

                // Basic validation
                if (!sUsername || !sPassword) {
                    MessageBox.error("Por favor ingrese usuario y contraseña");
                    return;
                }

                // Show loading indicator
                const loginButton: any = this.byId("loginButton");
                if (loginButton) {
                    loginButton.setEnabled(false);
                    loginButton.setText("Verificando...");
                }

                // Authenticate user asynchronously
                this.authenticateUser(sUsername, sPassword).then((authenticated: boolean) => {
                    if (authenticated) {
                        this.setAuthenticationState(true, sUsername, bRememberMe);
                        
                        MessageToast.show("Inicio de sesión exitoso", {
                            duration: 2000
                        });

                        const oRouter: any = this.getOwnerComponent().getRouter();
                        oRouter.navTo("RouteConfiguracion");
                    } else {
                        MessageBox.error("Usuario o contraseña incorrectos");
                    }
                }).catch((error: any) => {
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

            authenticateUser: function (this: any, sUsername: string, sPassword: string): Promise<boolean> {
                return new Promise((resolve, reject) => {
                    // Get mock users data
                    const aUserAccess: any = new JSONModel();
                    
                    try {
                        // Load data synchronously first
                        aUserAccess.loadData("./model/mock/users.json", undefined, false);
                        
                        // Try to get data immediately
                        const data = aUserAccess.getData();
                        if (data && data.users) {
                            const aUsers: User[] = data.users;
                            
                            // Find user with matching credentials (using email as username)
                            const oUser: User | undefined = aUsers.find(function(user: User): boolean {
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

            useFallbackUsers: function (this: any, sUsername: string, sPassword: string, resolve: any): void {
                const fallbackUsers: User[] = [
                    {
                        id: 1,
                        name: "Admin User",
                        email: "admin@company.com",
                        password: "admin123",
                        role: "admin",
                        status: "active",
                        companies: [{ id: 1, name: "Demo Company" }]
                    },
                    {
                        id: 2,
                        name: "Regular User",
                        email: "user@company.com",
                        password: "user123",
                        role: "user",
                        status: "active",
                        companies: [{ id: 1, name: "Demo Company" }]
                    }
                ];
                
                const oUser: User | undefined = fallbackUsers.find(function(user: User): boolean {
                    return user.email === sUsername && user.password === sPassword;
                });
                
                if (oUser) {
                    this.oCurrentUser = oUser;
                    resolve(true);
                } else {
                    resolve(false);
                }
            },

            setAuthenticationState: function (this: any, bAuthenticated: boolean, sUsername: string, bRememberMe: boolean): void {
                const oAuthData: AuthData = {
                    isAuthenticated: bAuthenticated,
                    userInfo: this.oCurrentUser || {} as User,
                    timestamp: Date.now()
                };

                if (bRememberMe) {
                    localStorage.setItem("finanb1_auth", JSON.stringify(oAuthData));
                } else {
                    sessionStorage.setItem("finanb1_auth", JSON.stringify(oAuthData));
                }
            },

            onForgotPassword: function (this: any): void {
                MessageBox.information("Función de recuperación de contraseña en desarrollo");
            },

            onKeyPress: function (this: any, oEvent: any): void {
                // Handle Enter key press to trigger login
                if (oEvent.getParameter("keyCode") === 13) { // Enter key
                    this.onLoginPress();
                }
            },

            getAuthenticationState: function (this: any): AuthData | null {
                // Check both session and local storage
                const sAuthData: string | null = sessionStorage.getItem("finanb1_auth") || localStorage.getItem("finanb1_auth");
                return sAuthData ? JSON.parse(sAuthData) as AuthData : null;
            }
        });
    });
