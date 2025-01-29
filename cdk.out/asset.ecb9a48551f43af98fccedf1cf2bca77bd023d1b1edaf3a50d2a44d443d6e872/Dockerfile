# Usar una imagen base con Flutter preinstalado
FROM cirrusci/flutter:stable

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos necesarios para obtener las dependencias de Flutter
COPY ../../codigo/reciclaje/pubspec.* ./

# Obtener las dependencias de Flutter
RUN flutter pub get

# Copiar el resto de los archivos de la aplicación Flutter
COPY ../../codigo/reciclaje/ ./

# Compilar la aplicación Flutter
RUN flutter build apk --release

# Definir el comando por defecto
CMD ["echo", "Flutter build complete"]
