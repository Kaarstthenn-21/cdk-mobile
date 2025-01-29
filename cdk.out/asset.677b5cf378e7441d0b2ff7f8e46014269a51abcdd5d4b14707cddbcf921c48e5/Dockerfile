# Utiliza una imagen de Flutter
FROM cirrusci/flutter:stable

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos pubspec en el contenedor
COPY codigo/reciclaje/pubspec.* /app/
COPY codigo/reciclaje/ /app/
# Ejecuta 'flutter pub get' para obtener las dependencias
RUN flutter pub get

# Listar los elementos de la carpeta /app
RUN ls -la /app

# Copia el resto del código de la aplicación en el contenedor


# Listar los elementos de la carpeta /app después de copiar el código
RUN ls -la /app

# Ejecuta el comando predeterminado
CMD ["flutter", "build", "apk", "--release"]
