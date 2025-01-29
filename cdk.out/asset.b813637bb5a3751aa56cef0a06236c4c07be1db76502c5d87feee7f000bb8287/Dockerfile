# Usa la imagen base de Flutter estable
FROM cirrusci/flutter:stable

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo pubspec.yaml y pubspec.lock a la raíz del directorio de trabajo en el contenedor
COPY ./pubspec.* ./

# Copia todo el contenido del directorio reciclaje/ al directorio /app/ en el contenedor
COPY ./reciclaje/ ./

# Instala las dependencias de Flutter
RUN flutter pub get

# Verifica los elementos copiados en la carpeta /app
RUN ls -la

# CMD o ENTRYPOINT aquí para definir el comando principal que se ejecutará al iniciar el contenedor
