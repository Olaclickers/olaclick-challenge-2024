import { readFile } from "fs/promises";

const getRoles = async () => {
    try {
        const fileRole = await readFile("src/config/role/role.json", "utf-8");
        return JSON.parse(fileRole);
    } catch (error) {
        console.log(error);
    }
};

export const Roles = getRoles();


export const permissionsRol = [
    {
        "endpoint": "/api/users/update-role",
        "methods": [
            {
                "method": "PATCH",
                "allowed_roles": ["SystemAdministrator", "Developer"]
            },
        ]
    },
]