# TFM Ruben

Se trata de una interfaz gráfica para la realización de un proceso de selección de características, destinado especialmete a personas sin experiencia en el campo. A continuación, se explica brevemente como ejecutar de forma local el proyecto.

## Estructura del Proyecto

- **/tfm-frontend**: Interfaz gráfica de la aplicación.
- **/tfm-backend/server**: Servidor Web.
- **/tfm-backend/e2efs**: Método selector de características.

## Requisitos

Para ejecutar este proyecto, asegúrate de tener instalados los siguientes requisitos:

- Python 3.9.5.
- Librerías Python necesarias (consultar `requiremets.txt`).
- Node.js 22.14.0.
- Angular 19.1.7 y dependencias del proyecto (consultar `package.json`).

## Instalación

1. Clonar el repositorio:
    ```bash
    git clone https://github.com/usuario/tfm-ruben.git
    ```
2. Instalar las dependencias de Python:
    ```bash
    cd tfm-backend
    pip install -r requirements.txt
    ```
3. Descargar e instalar [node.js](https://nodejs.org/es/download):

    * En Windows
        ```bash
        # Descarga e instala fnm:
        winget install Schniz.fnm
        # Descarga e instala Node.js:
        fnm install 22
        # Verifica la versión de Node.js:
        node -v # Debería mostrar "v22.14.0".
        # Verifica versión de npm:
        npm -v # Debería mostrar "10.9.2".
        ```

    * En Linux o MacOS
        ```bash
        # Descarga e instala fnm:
        curl -o- https://fnm.vercel.app/install | bash
        # Descarga e instala Node.js:
        fnm install 22
        # Verifica la versión de Node.js:
        node -v # Debería mostrar "v22.14.0".
        # Verifica versión de npm:
        npm -v # Debería mostrar "10.9.2".
        ```
4. Instalar Angular y las demás dependencias de la GUI:
    ```bash
    cd tfm-frontend
    npm install
    ```

## Uso

Para ejecutar la aplicación, deben seguirse los siguientes pasos:

1. Ejecutar el backend:
    ```bash
    cd tfm-backend
    fastapi dev server/server.py
    ```
2. Ejecutar el frontend:
    ```bash
    cd tfm-frontend
    ng serve
    ```
3. Ya puede accederse a la aplicación a través de cualquier navegador, a través de la dirección [http://localhost:4200](http://localhost:4200).

## Contacto

Para cualquier consulta, puede contactarse al correo [ruben.tome@udc.es](mailto:ruben.tome@udc.es).
