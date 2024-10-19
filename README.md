# Hexagonal Architecture by Gentleman Programming

YT url: https://youtube.com/playlist?list=PL42UNLc8e48RHavn_jKOfFcf5u73O-w14&si=1LlTGhwTHCUOIDW7

---

La idea principal de una architectura de software es el SoC: 'Separation of concerns' o 'Separación de intereses/conceptos', es un principio de diseño para separar un programa informático en secciones distintas, tal que cada sección enfoca un interés delimitado.

![hexagonal-architecture](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*mGLO5IfhJv4o0NYOAZI60A.png)

A continuación simulo la gráfica de la Hexagonal Architecture:

```sh
************************************ ________________________ *****************************************
*********************************** /++++++++++++++++++++++++\ ****************************************
********************************** /++++++++++++++++++++++++++\ ***************************************
**** [PRIMARY TRIGGERS] --> PORT==/=>[DRIVER-|++++++[DRIVEN-|==\=>PORT --> [SECONDARY TRIGGERS] *******
******************************** /+++|ADAPTER]++++++|ADAPTER]+++\ *************************************
******************************* /++++++++++++++++++++++++++++++++\ ************************************
****************************** /++++++++++++++++++++++++++++++++++\ ***********************************
***************************** |+++++++++++++[DOMAIN]+++++++++++++++| **********************************
****************************** \++++++++++++++++++++++++++++++++++/ ***********************************
******************************* \++++++++++++++++++++++++++++++++/ ************************************
******************************** \+++[DRIVER-|++++++[DRIVEN-|+++/ *************************************
**** [PRIMARY TRIGGERS] --> PORT==\=>|ADAPTER]++++++|ADAPTER]==/=>PORT --> [SECONDARY TRIGGERS] *******
********************************** \++++++++++++++++++++++++++/ ***************************************
*********************************** \++++++++++++++++++++++++/ ****************************************
************************************ \______________________/ *****************************************
```

- DOMAIN: Contiene todas las definiciones relacionadas a la lógica de negocio
- PORT: Es un punto de entrada/salida que permitirá a actores externos comunicarse con el servicio/domain por medio los `ADAPTER`
- DRIVER ADAPTER: Interactúa con el servicio/domain por medio de un `PORT`
- DRIVEN ADAPTER: Permite interactuar con otros servicios/hexágonos por medio de un `PORT`
- PRIMARY TRIGGERS: Son los eventos o actores que interactúan con el servicio/hexágono por medio del puerto de un driver adapter que define los parámetros que recibirá desde un servicio o interface
- SECONDARY TRIGGERS: Son los eventos o actores que interactuarán con otros servicios/hexágonos por medio de los Driven Adapters y sincronizarán con los mismos

### Folder structure

```sh
├── services
│   ├── API
│   │   ├── app
│   │   │   ├── schemas
│   │   ├── ports
│   │   │   ├── drivens
│   │   │   ├── drivers
│   │   ├── adapters
│   │   │   ├── drivens
│   │   │   ├── drivers
│   ├── repository
│   │   ├── app
│   │   │   ├── schemas
│   │   ├── ports
│   │   │   ├── drivens
│   │   │   ├── drivers
│   │   ├── adapters
│   │   │   ├── drivens
│   │   │   ├── drivers
```
