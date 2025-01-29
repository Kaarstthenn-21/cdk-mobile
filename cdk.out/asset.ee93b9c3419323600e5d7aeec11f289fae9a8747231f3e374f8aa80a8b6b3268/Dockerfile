# Usa la imagen base de Flutter
FROM docker.io/cirrusci/flutter:stable

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para obtener las dependencias de Flutter
COPY ./codigo/reciclaje/pubspec.* /app/
RUN flutter pub get

# Copia todo el código fuente del repositorio al contenedor
COPY ./codigo/reciclaje/ /app/

# Compila tu aplicación para Android en modo release
RUN flutter build apk --release
