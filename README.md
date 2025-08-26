# Frontend del visualizador de la urbanización México

## Requisitos
- Node.js 24+
- [Backend del proyecto](https://github.com/guillermocegueda/backend-maqueta-itur)

## Instalación
1. Descarga el repositorio:
```cmd
git clone git@github.com:guillermocegueda/maqueta-itur.git
```
2. Entrar a la carpeta:
```cmd
cd maqueta-itur
```
3. Instalar dependencias:
```cmd
npm install
```
4. Renombrar el archivo `template.env` a `.env`
5. En el archivo `.env` asignar el valor a la variable `VITE_URL_BACKEND` con la dirección y el puerto del backend del proyecto:
```txt
# Si es el mismo equipo (localhost):
VITE_URL_BACKEND="http://127.0.0.1:3000"
```
6. Ejecutar el modo desarrollo:
```cmd
npm run dev
```
7. Abrir en el navegador [localhost](http://127.0.0.1:5173)
