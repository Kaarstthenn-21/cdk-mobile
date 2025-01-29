# Usa la imagen base de Flutter
FROM docker.io/cirrusci/flutter:stable

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para obtener las dependencias de Flutter
COPY codigo/reciclaje/pubspec.* ./app
RUN flutter pub get

# COPY ./codigo/reciclaje/ /app/

# RUN flutter build apk --release
