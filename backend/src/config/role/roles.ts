import { readFile } from 'fs/promises';

export const getRoles = async () => {
  try {
    const fileRole = await readFile('src/config/role/role.json', 'utf-8');
    return JSON.parse(fileRole);
  } catch (error) {
    console.error('Error al leer el archivo de roles:', error);
    return []; 
  }
};

export const permissionsRol = [
  {
    endpoint: '/api/orders',
    methods: [
      {
        method: 'POST',
        allowed_roles: ['administrador'],
      },
    ],
  },
];
