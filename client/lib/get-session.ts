import { authClient } from "./auth.client";
export async function getSession() {
    return authClient.getSession()
}