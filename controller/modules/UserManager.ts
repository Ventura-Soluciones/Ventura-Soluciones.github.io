/**
 * UserManager - Handles user authentication and management
 */
export class UserManager {
    private oCurrentUser: any;

    constructor() {
        this.oCurrentUser = null;
    }

    public loadAuthenticatedUser(): any {
        // Obtener datos de autenticación del almacenamiento
        const authData: string | null = sessionStorage.getItem("finanb1_auth") || localStorage.getItem("finanb1_auth");
        
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

    private setDefaultUser(): void {
        // Establecer usuario por defecto si no hay datos de autenticación
        this.oCurrentUser = {
            id: 1,
            name: "Demo User",
            email: "demo@company.com",
            role: "admin",
            status: "active",
            companies: [{ id: 1, name: "Demo Company" }]
        };
        console.log("Usando usuario por defecto:", this.oCurrentUser);
    }

    public getCurrentUser(): any {
        return this.oCurrentUser;
    }

    public checkAuthentication(): boolean {
        const sAuthData = sessionStorage.getItem("com.vs.extension.finanb1_auth") || localStorage.getItem("com.vs.extension.finanb1_auth");
        if (!sAuthData) return false;
        const oAuthData = JSON.parse(sAuthData);
        return oAuthData && oAuthData.isAuthenticated;
    }

    public logout(): void {
        sessionStorage.removeItem("finanb1_auth");
        localStorage.removeItem("finanb1_auth");
        this.oCurrentUser = null;
    }
} 