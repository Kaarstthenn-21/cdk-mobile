# Utiliza una imagen de Flutter base
FROM cirrusci/flutter:stable

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos pubspec y otros archivos necesarios
COPY ./pubspec.* /app
RUN pwd
RUN ls -la
# Instala las dependencias de Flutter
RUN flutter pub get

# Verifica los elementos copiados en la carpeta /app
RUN ls -la /app

# Copia el resto del código de la aplicación en el contenedor
COPY . /app/

# Establece el directorio de trabajo para Flutter
WORKDIR /app

# Ejecuta el comando predeterminado
CMD ["flutter", "build", "apk", "--release"]
